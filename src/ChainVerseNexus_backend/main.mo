import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

actor class NFTMarketplace() = this {
  // Types
  type TokenId = Nat;
  type TokenURI = Text;
  type ListingId = Nat;
  
  type Listing = {
    seller: Principal;
    tokenId: TokenId;
    price: Nat;
    isActive: Bool;
    created: Time.Time;
  };

  type NFTTransaction = {
    tokenId: TokenId;
    from: Principal;
    to: Principal;
    price: ?Nat; // Optional price for sales
    timestamp: Time.Time;
  };

  // State
  let owner = Principal.fromActor(this);
  var nextTokenId : TokenId = 0;
  var nextListingId : ListingId = 0;
  
  // Storage
  let tokenOwners = HashMap.HashMap<TokenId, Principal>(0, Nat.equal, Hash.hash);
  let tokenMetadata = HashMap.HashMap<TokenId, TokenURI>(0, Nat.equal, Hash.hash);
  let tokenListings = HashMap.HashMap<ListingId, Listing>(0, Nat.equal, Hash.hash);
  let tokenListingsByToken = HashMap.HashMap<TokenId, ListingId>(0, Nat.equal, Hash.hash);
  let transactionHistory = HashMap.HashMap<Nat, NFTTransaction>(0, Nat.equal, Hash.hash);
  var transactionCount : Nat = 0;
  
  // Marketplace fees (in percentage, e.g., 2.5%)
  let marketplaceFeePercentage : Nat = 25; // 2.5% represented as 25/1000
  let marketplaceWallet : Principal = owner; // Could be changed to a specific wallet
  
  // Fee calculation helper
  private func calculateFee(amount: Nat) : Nat {
    return (amount * marketplaceFeePercentage) / 1000;
  };
  
  // Record transaction
  private func recordTransaction(tokenId: TokenId, from: Principal, to: Principal, price: ?Nat) {
    let transaction : NFTTransaction = {
      tokenId = tokenId;
      from = from;
      to = to;
      price = price;
      timestamp = Time.now();
    };
    
    transactionHistory.put(transactionCount, transaction);
    transactionCount += 1;
  };
  
  // Core NFT functionality
  public shared(msg) func mintNFT(uri: TokenURI) : async TokenId {
    let caller = msg.caller;
    
    // Don't allow anonymous users to mint
    if (Principal.isAnonymous(caller)) {
      throw Error.reject("Anonymous users cannot mint NFTs");
    };
    
    let tokenId = nextTokenId;
    nextTokenId := nextTokenId + 1;
    
    tokenOwners.put(tokenId, caller);
    tokenMetadata.put(tokenId, uri);
    
    // Record minting transaction (from marketplace to minter)
    recordTransaction(tokenId, owner, caller, null);
    
    return tokenId;
  };
  
  public query func getTokenURI(tokenId: TokenId) : async ?TokenURI {
    tokenMetadata.get(tokenId);
  };
  
  public query func getOwner(tokenId: TokenId) : async ?Principal {
    tokenOwners.get(tokenId);
  };
  
  public shared(msg) func transfer(to: Principal, tokenId: TokenId) : async Bool {
    let caller = msg.caller;
    
    // Verify ownership
    switch (tokenOwners.get(tokenId)) {
      case (?currentOwner) {
        if (currentOwner == caller) {
          // Check if token is listed and remove listing if it exists
          switch (tokenListingsByToken.get(tokenId)) {
            case (?listingId) {
              tokenListings.delete(listingId);
              tokenListingsByToken.delete(tokenId);
            };
            case null {};
          };
          
          // Process transfer
          tokenOwners.put(tokenId, to);
          recordTransaction(tokenId, caller, to, null);
          return true;
        } else {
          return false;
        };
      };
      case null return false;
    }
  };
  
  // Marketplace functionality
  public shared(msg) func listForSale(tokenId: TokenId, price: Nat) : async ?ListingId {
    let caller = msg.caller;
    
    // Verify ownership
    switch (tokenOwners.get(tokenId)) {
      case (?currentOwner) {
        if (currentOwner != caller) {
          return null;
        };
        
        // Create the listing
        let listingId = nextListingId;
        nextListingId += 1;
        
        let newListing : Listing = {
          seller = caller;
          tokenId = tokenId;
          price = price;
          isActive = true;
          created = Time.now();
        };
        
        tokenListings.put(listingId, newListing);
        tokenListingsByToken.put(tokenId, listingId);
        
        return ?listingId;
      };
      case null {
        return null;
      };
    }
  };
  
  public shared(msg) func cancelListing(tokenId: TokenId) : async Bool {
    let caller = msg.caller;
    
    // Verify ownership
    switch (tokenOwners.get(tokenId)) {
      case (?currentOwner) {
        if (currentOwner != caller) {
          return false;
        };
        
        // Remove listing if it exists
        switch (tokenListingsByToken.get(tokenId)) {
          case (?listingId) {
            tokenListings.delete(listingId);
            tokenListingsByToken.delete(tokenId);
            return true;
          };
          case null {
            return false;
          };
        };
      };
      case null {
        return false;
      };
    }
  };
  
  public shared(msg) func purchaseNFT(tokenId: TokenId) : async Bool {
    let buyer = msg.caller;
    
    // Don't allow anonymous users to purchase
    if (Principal.isAnonymous(buyer)) {
      return false;
    };
    
    // Find listing
    switch (tokenListingsByToken.get(tokenId)) {
      case (?listingId) {
        switch (tokenListings.get(listingId)) {
          case (?listing) {
            if (not listing.isActive) {
              return false;
            };
            
            // Here, in a real implementation, we would handle payment
            // This would typically involve a token canister call
            // For the purpose of this example, we'll just transfer ownership
            
            // Calculate marketplace fee
            let fee = calculateFee(listing.price);
            let sellerPayment = listing.price - fee;
            
            // In a real implementation, funds would be transferred here:
            // - sellerPayment to the seller
            // - fee to the marketplace wallet
            
            // Transfer NFT to buyer
            tokenOwners.put(tokenId, buyer);
            
            // Remove listing
            tokenListings.delete(listingId);
            tokenListingsByToken.delete(tokenId);
            
            // Record transaction
            recordTransaction(tokenId, listing.seller, buyer, ?listing.price);
            
            return true;
          };
          case null {
            return false;
          };
        };
      };
      case null {
        return false;
      };
    };
  };
  
  // Query methods for marketplace
  public query func getActiveListing(tokenId: TokenId) : async ?Listing {
    switch (tokenListingsByToken.get(tokenId)) {
      case (?listingId) {
        tokenListings.get(listingId);
      };
      case null {
        null;
      };
    };
  };
  
  public query func getAllListings() : async [Listing] {
    let listings = Iter.toArray(Iter.filter(tokenListings.vals(), func (l: Listing) : Bool { l.isActive }));
    return listings;
  };
  
  // Get user's owned NFTs
  public query func getOwnedNFTs(user: Principal) : async [(TokenId, TokenURI)] {
    var userNFTs : [(TokenId, TokenURI)] = [];
    
    for ((tokenId, owner) in tokenOwners.entries()) {
      if (owner == user) {
        switch (tokenMetadata.get(tokenId)) {
          case (?uri) {
            userNFTs := Array.append(userNFTs, [(tokenId, uri)]);
          };
          case null {};
        };
      };
    };
    
    return userNFTs;
  };
  
  // Get transaction history
  public query func getTokenTransactionHistory(tokenId: TokenId) : async [NFTTransaction] {
    let allTransactions = Iter.toArray(transactionHistory.vals());
    
    return Array.filter(allTransactions, func (tx: NFTTransaction) : Bool {
      return tx.tokenId == tokenId;
    });
  };
  
  // Get marketplace statistics
  public query func getMarketplaceStats() : async {
    totalTokens: Nat;
    totalListings: Nat;
    totalTransactions: Nat;
  } {
    return {
      totalTokens = nextTokenId;
      totalListings = tokenListings.size();
      totalTransactions = transactionCount;
    };
  };
};