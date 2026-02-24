interface User {
    id: string;
    name: string;
    contactNumber: string;
    wishlist: Set<string>; // Set of Land IDs
}

interface Offer {
    offerId: string;
    landId: string;
    buyerId: string;
    amount: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

interface Land {
    id: string;
    location: string;
    price: number;
    ownerId: string;
    isForSale: boolean;
    interestedBuyers: Set<string>; // Set of User IDs
    approvedBuyerId: string | null; // Null if no one is approved yet
}

class LandMarketplace {
    private users: Map<string, User> = new Map();
    private lands: Map<string, Land> = new Map();
    private offers: Map<string, Offer> = new Map();

    private idCounter = 1;

    private generateId(): string {
        return (this.idCounter++).toString();
    }

    // Register a new user
    registerUser(name: string, contactNumber: string): string {
        const id = this.generateId();
        const user: User = { id, name, contactNumber, wishlist: new Set() };
        this.users.set(id, user);
        console.log(`[USER] Registered ${name} with ID: ${id}`);
        return id;
    }

    // List land for sale
    listLandForSale(ownerId: string, location: string, price: number): string | null {
        if (!this.users.has(ownerId)) {
            console.error("Owner not found.");
            return null;
        }

        const id = this.generateId();
        const land: Land = {
            id,
            location,
            price,
            ownerId,
            isForSale: true,
            interestedBuyers: new Set(),
            approvedBuyerId: null
        };
        this.lands.set(id, land);
        console.log(`[LAND] Listed at ${location} for $${price} by User ${ownerId}. Land ID: ${id}`);
        return id;
    }

    // Wishlist a land
    wishlistLand(userId: string, landId: string): boolean {
        const user = this.users.get(userId);
        const land = this.lands.get(landId);

        if (!user || !land) return false;

        user.wishlist.add(landId);
        console.log(`[WISHLIST] User ${user.name} added Land ${landId} to their wishlist.`);
        return true;
    }

    // Show interest in a land
    showInterest(userId: string, landId: string): boolean {
        const user = this.users.get(userId);
        const land = this.lands.get(landId);

        if (!user || !land) return false;
        if (land.ownerId === userId) return false;

        land.interestedBuyers.add(userId);
        console.log(`[INTEREST] User ${user.name} showed interest in Land ${landId}.`);
        return true;
    }

    // Ask for the owner's contact number
    requestOwnerContact(requesterId: string, landId: string): string | null {
        const requester = this.users.get(requesterId);
        const land = this.lands.get(landId);

        if (!requester || !land) return null;

        if (land.interestedBuyers.has(requesterId) || requester.wishlist.has(landId)) {
            const owner = this.users.get(land.ownerId);
            if (owner) {
                console.log(`[CONTACT] Shared ${owner.name}'s contact: ${owner.contactNumber} (Requested by ${requester.name})`);
                return owner.contactNumber;
            }
        } else {
            console.error("[ERROR] Must show interest or wishlist the land before requesting contact.");
        }
        return null;
    }

    // Make an offer (Price Negotiation)
    makeOffer(buyerId: string, landId: string, amount: number): string | null {
        const land = this.lands.get(landId);
        const buyer = this.users.get(buyerId);

        if (!land || !buyer || !land.isForSale) return null;
        if (land.ownerId === buyerId) return null;

        const offerId = this.generateId();
        const offer: Offer = {
            offerId,
            landId,
            buyerId,
            amount,
            status: 'PENDING'
        };
        this.offers.set(offerId, offer);
        console.log(`[OFFER] User ${buyer.name} made an offer of $${amount} on Land ${landId} (Offer ID: ${offerId})`);
        return offerId;
    }

    // Owner reviews and responds to an offer
    respondToOffer(ownerId: string, offerId: string, accept: boolean): boolean {
        const offer = this.offers.get(offerId);
        if (!offer || offer.status !== 'PENDING') return false;

        const land = this.lands.get(offer.landId);
        if (!land || land.ownerId !== ownerId) {
            console.error("[ERROR] Only the owner can respond to offers on this land.");
            return false;
        }

        if (accept) {
            offer.status = 'ACCEPTED';
            land.approvedBuyerId = offer.buyerId; // Lock in the buyer
            console.log(`[OFFER] Owner accepted offer ${offerId}. Buyer ${offer.buyerId} is now approved to buy Land ${land.id}.`);

            // Reject all other pending offers for this land
            for (const otherOffer of this.offers.values()) {
                if (otherOffer.landId === land.id && otherOffer.offerId !== offerId && otherOffer.status === 'PENDING') {
                    otherOffer.status = 'REJECTED';
                }
            }
        } else {
            offer.status = 'REJECTED';
            console.log(`[OFFER] Owner rejected offer ${offerId}.`);
        }

        return true;
    }

    // Buy land (Requires approval first)
    buyLand(buyerId: string, landId: string): boolean {
        const buyer = this.users.get(buyerId);
        const land = this.lands.get(landId);

        if (!buyer || !land) return false;
        if (!land.isForSale) {
            console.error("[ERROR] Land is not for sale.");
            return false;
        }

        if (land.approvedBuyerId !== buyerId) {
            console.error(`[ERROR] User ${buyer.name} is not approved to buy Land ${landId}. Make an offer first and get it accepted!`);
            return false;
        }

        console.log(`[PURCHASE] SUCCESS! User ${buyer.name} bought Land ${land.id} from User ${this.users.get(land.ownerId)?.name}.`);

        // Transfer ownership
        land.ownerId = buyerId;
        land.isForSale = false;
        land.approvedBuyerId = null;
        land.interestedBuyers.clear();

        return true;
    }
}

// ==== EXAMPLE USAGE ====
const marketplace = new LandMarketplace();

// 1. Register users
const aliceId = marketplace.registerUser("Alice", "123-456-7890");
const bobId = marketplace.registerUser("Bob", "987-654-3210");
const charlieId = marketplace.registerUser("Charlie", "555-555-5555");

// 2. Alice lists her land
console.log("\n--- Listing Land ---");
const landId1 = marketplace.listLandForSale(aliceId, "Downtown City", 50000);

if (landId1) {
    // 3. Bob and Charlie show interest & ask for number
    console.log("\n--- Showing Interest & Getting Details ---");
    marketplace.showInterest(bobId, landId1);
    marketplace.requestOwnerContact(bobId, landId1);

    // 4. Negotiations begin!
    console.log("\n--- Negotiations ---");
    const bobOfferId = marketplace.makeOffer(bobId, landId1, 45000); // Bob lowballs
    const charlieOfferId = marketplace.makeOffer(charlieId, landId1, 48000); // Charlie offers closer to price

    if (bobOfferId && charlieOfferId) {
        // Alice rejects Bob's offer
        marketplace.respondToOffer(aliceId, bobOfferId, false);

        // Alice accepts Charlie's offer
        marketplace.respondToOffer(aliceId, charlieOfferId, true);
    }

    // 5. Purchasing
    console.log("\n--- Purchasing Time ---");
    // Bob tries to buy directly, but he's not approved!
    marketplace.buyLand(bobId, landId1);

    // Charlie buys successfully since he's approved
    marketplace.buyLand(charlieId, landId1);
}
