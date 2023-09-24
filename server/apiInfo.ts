export const data = `"Response Information:

All Cards

    id - ID or Passcode of the card.
    name - Name of the card.
    type - The type of card you are viewing (Normal Monster, Effect Monster, Synchro Monster, Spell Card, Trap Card, etc.).
    frameType - The backdrop type that this card uses (normal, effect, synchro, spell, trap, etc.).
    desc - Card description/effect.

Monster Cards

    atk - The ATK value of the card.
    def - The DEF value of the card.
    level - The Level/RANK of the card.
    race - The card race which is officially called type (Spellcaster, Warrior, Insect, etc).
    attribute - The attribute of the card.

Spell/Trap Cards

    race - The card race which is officially called type for Spell/Trap Cards (Field, Equip, Counter, etc).

Card Archetype

    archetype - The Archetype that the card belongs to. We take feedback on Archetypes here.

Additional Response for Pendulum Monsters

    scale - The Pendulum Scale Value.

Additional Response for Link Monsters

    linkval - The Link Value of the card if it's of type "Link Monster".
    linkmarkers - The Link Markers of the card if it's of type "Link Monster". This information is returned as an array.

Card Sets

    You can now optionally use tcgplayer_data parameter. Using this will replace our internal Card Set data with TCGplayer Card Set Data.
    NOTE: If using tcgplayer_data, we cannot guarantee that Set Names, Rairites and other info are correct. TCGplayer have occasionally made up Rarity names in the past and don't always conform to correct Card Set Names. A prime example of this is "Legend of Blue Eyes White Dragon" which TCGplayer lists as "The Legend of Blue Eyes White Dragon".
    A Card Sets array is now returned as of v5. card_sets
    The array holds each set the card is found in. Each set contains the following info: set_name, set_code, set_rarity, set_price.
    If using tcgplayer_data, the API will also return set_edition and set_url.
    set_price is the $ value.

Card Images

    A Card Images array is now returned as of v5. card_images
    The array holds each image/alt artwork image along with the Card ID. Each set contains the following info: id, image_url, image_url_small, image_url_cropped.
    Take this example: https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Decode%20Talker
    It contains two sets of Card IDs/Images within the card_images array. This is for the default artwork and the additional alternative artwork.

Card Prices

    A Card Prices array is now returned as of v5. card_prices
    The array holds card prices from multiple vendors. This is the lowest price found across multiple versions of that card.
    cardmarket_price - The price of the card from Cardmarket (in €).
    coolstuffinc_price - The price of the card from CoolStuffInc (in $).
    tcgplayer_price - The price of the card from Tcgplayer (in $).
    ebay_price - The price of the card from eBay (in $).
    amazon_price - The price of the card from Amazon (in $).

Banlist Info

    A Banlist Info array is now returned as of v5. banlist_info
    The array holds banlist information for that card.
    ban_tcg - The status of the card on the TCG Ban List.
    ban_ocg - The status of the card on the OCG Ban List.
    ban_goat - The status of the card on the GOAT Format Ban List.

Misc Information Returned:

    beta_name - The Old/Temporary/Translated name the card had.
    views - The number of times a card has been viewed in our database (does not include API/external views).
    viewsweek - The number of times a card has been viewed in our database this week (does not include API/external views).
    upvotes - The number of upvotes a card has.
    downvotes - The number of downvotes a card has.
    formats - The available formats the card is in (tcg, ocg, goat, ocg goat, duel links, rush duel or speed duel).
    treated_as - If the card is treated as another card. For example, Harpie Lady 1,2,3 are treated as Harpie Lady.
    tcg_date - The original date the card was released in the TCG.
    ocg_date - The original date the card was released in the OCG.
    has_effect - If the card has an actual text effect. 1 means true and 0 is false. Examples of cards that do not have an actual effect (false/0): Black Skull Dragon, LANphorhynchus, etc etc.

If a piece of response info is empty or null then it will NOT show up. For example, Link Monsters have no DEF, Level or Scale value so those values will not be returned.

{
  "data": [
    {
      "id": 6983839,
      "name": "Tornado Dragon",
      "type": "XYZ Monster",
      "frameType": "xyz",
      "desc": "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
      "atk": 2100,
      "def": 2000,
      "level": 4,
      "race": "Wyrm",
      "attribute": "WIND",
      "card_sets": [
        {
          "set_name": "Battles of Legend: Relentless Revenge",
          "set_code": "BLRR-EN084",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "4.08"
        },
        {
          "set_name": "Duel Devastator",
          "set_code": "DUDE-EN019",
          "set_rarity": "Ultra Rare",
          "set_rarity_code": "(UR)",
          "set_price": "1.4"
        },
        {
          "set_name": "Maximum Crisis",
          "set_code": "MACR-EN081",
          "set_rarity": "Secret Rare",
          "set_rarity_code": "(ScR)",
          "set_price": "4.32"
        }
      ],
      "card_images": [
        {
          "id": 6983839,
          "image_url": "https://images.ygoprodeck.com/images/cards/6983839.jpg",
          "image_url_small": "https://images.ygoprodeck.com/images/cards_small/6983839.jpg",
          "image_url_cropped": "https://images.ygoprodeck.com/images/cards_cropped/6983839.jpg"
        }
      ],
      "card_prices": [
        {
          "cardmarket_price": "0.42",
          "tcgplayer_price": "0.48",
          "ebay_price": "2.99",
          "amazon_price": "0.77",
          "coolstuffinc_price": "0.99"
        }
      ]
    }
  ]
}
                    

Tornado Dragon API response

https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon

Example Usage

The following is a list of examples you can do using the possible endpoint parameters shown above.

    Get all cards
    https://db.ygoprodeck.com/api/v7/cardinfo.php

    Get "Dark Magician" card information
    https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician

    Get all cards belonging to "Blue-Eyes" archetype
    https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes

    Get all Level 4/RANK 4 Water cards and order by atk
    https://db.ygoprodeck.com/api/v7/cardinfo.php?level=4&attribute=water&sort=atk

    Get all cards on the TCG Banlist who are level 4 and order them by name (A-Z)
    https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4&sort=name

    Get all Dark attribute monsters from the Metal Raiders set
    https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=metal%20raiders&attribute=dark

    Get all cards with "Wizard" in their name who are LIGHT attribute monsters with a race of Spellcaster
    https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=Wizard&attribute=light&race=spellcaster

    Get all Spell Cards that are Equip Spell Cards
    https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=equip

    Get all Speed Duel Format Cards
    https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Speed Duel

    Get all Rush Duel Format Cards
    https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Rush%20Duel

    Get all Water Link Monsters who have Link Markers of "Top" and "Bottom"
    https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=water&type=Link%20Monster&linkmarker=top,bottom

    Get Card Information while also using the misc parameter
    https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Tornado%20Dragon&misc=yes

    Get all cards considered Staples
    https://db.ygoprodeck.com/api/v7/cardinfo.php?staple=yes

    Get all TCG cards released between 1st Jan 2000 and 23rd August 2002
    https://db.ygoprodeck.com/api/v7/cardinfo.php?&startdate=01/01/2000&enddate=08/23/2002&dateregion=tcg_date

"`
