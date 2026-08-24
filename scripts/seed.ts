import { driver } from "@/lib/neo4j";

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("Seeding database...");

    // Clear existing database
    await session.run(`MATCH (n) DETACH DELETE n`);

    // ---------------------------------------------------------
    // AREAS, PROPERTY TYPES, AMENITIES AND PLACES
    // ---------------------------------------------------------

    await session.run(`
      CREATE

      // Areas
      (wuse:Area {
        id: "area-1",
        name: "Wuse"
      }),

      (garki:Area {
        id: "area-2",
        name: "Garki"
      }),

      (maitama:Area {
        id: "area-3",
        name: "Maitama"
      }),

      // Property Types
      (apartment:PropertyType {
        id: "type-1",
        name: "Apartment"
      }),

      (duplex:PropertyType {
        id: "type-2",
        name: "Duplex"
      }),

      // Amenities
      (parking:Amenity {
        id: "amenity-1",
        name: "Parking"
      }),

      (security:Amenity {
        id: "amenity-2",
        name: "Security"
      }),

      (generator:Amenity {
        id: "amenity-3",
        name: "Generator"
      }),

      // Nearby Places
      (hospital:Place {
        id: "place-1",
        name: "General Hospital",
        type: "Hospital"
      }),

      (school:Place {
        id: "place-2",
        name: "Government Secondary School",
        type: "School"
      })
    `);

    // ---------------------------------------------------------
    // PROPERTIES
    // ---------------------------------------------------------

    await session.run(`
      MATCH
        (wuse:Area {id: "area-1"}),
        (garki:Area {id: "area-2"}),
        (maitama:Area {id: "area-3"}),

        (apartment:PropertyType {id: "type-1"}),
        (duplex:PropertyType {id: "type-2"}),

        (parking:Amenity {id: "amenity-1"}),
        (security:Amenity {id: "amenity-2"}),
        (generator:Amenity {id: "amenity-3"}),

        (hospital:Place {id: "place-1"}),
        (school:Place {id: "place-2"})

      CREATE

      // =====================================================
      // WUSE PROPERTIES
      // =====================================================

      (p1:Property {
        id: "property-1",
        name: "GreenView Apartment",
        price: 1500000,
        description: "A comfortable apartment located in the heart of Wuse.",
        bedrooms: 2
      }),

      (p2:Property {
        id: "property-2",
        name: "Wuse Central Apartment",
        price: 2500000,
        description: "Modern apartment with convenient access to major parts of Abuja.",
        bedrooms: 3
      }),

      (p3:Property {
        id: "property-3",
        name: "Wuse Luxury Apartment",
        price: 4500000,
        description: "A spacious luxury apartment in a prime Wuse location.",
        bedrooms: 4
      }),

      (p4:Property {
        id: "property-4",
        name: "Wuse Family Duplex",
        price: 7000000,
        description: "A large family duplex with excellent facilities.",
        bedrooms: 4
      }),

      (p5:Property {
        id: "property-5",
        name: "Wuse Executive Duplex",
        price: 10000000,
        description: "An executive duplex suitable for families and professionals.",
        bedrooms: 5
      }),

      // =====================================================
      // GARKI PROPERTIES
      // =====================================================

      (p6:Property {
        id: "property-6",
        name: "Garki Estate Apartment",
        price: 2000000,
        description: "Affordable apartment located in a convenient part of Garki.",
        bedrooms: 2
      }),

      (p7:Property {
        id: "property-7",
        name: "Garki Modern Apartment",
        price: 3500000,
        description: "Modern three-bedroom apartment in Garki.",
        bedrooms: 3
      }),

      (p8:Property {
        id: "property-8",
        name: "Garki Premium Apartment",
        price: 5000000,
        description: "Premium apartment with spacious rooms and modern facilities.",
        bedrooms: 4
      }),

      (p9:Property {
        id: "property-9",
        name: "Garki Family Duplex",
        price: 8500000,
        description: "Spacious duplex suitable for a large family.",
        bedrooms: 4
      }),

      (p10:Property {
        id: "property-10",
        name: "Garki Executive Duplex",
        price: 12000000,
        description: "Luxury executive duplex in a quiet part of Garki.",
        bedrooms: 5
      }),

      // =====================================================
      // MAITAMA PROPERTIES
      // =====================================================

      // 1 amenity + 4 bedrooms = minimum ₦4m
      (p11:Property {
        id: "property-11",
        name: "Maitama Classic Apartment",
        price: 4000000,
        description: "A spacious four-bedroom apartment in Maitama.",
        bedrooms: 4
      }),

      // 2 amenities + 4 bedrooms
      (p12:Property {
        id: "property-12",
        name: "Maitama Premium Apartment",
        price: 12000000,
        description: "Premium four-bedroom apartment in an exclusive Maitama location.",
        bedrooms: 4
      }),

      // 3 amenities + 4 bedrooms = ₦30m
      (p13:Property {
        id: "property-13",
        name: "Maitama Luxury Apartment",
        price: 30000000,
        description: "Luxury four-bedroom apartment with complete amenities.",
        bedrooms: 4
      }),

      (p14:Property {
        id: "property-14",
        name: "Maitama Grand Duplex",
        price: 18000000,
        description: "Spacious five-bedroom duplex in Maitama.",
        bedrooms: 5
      }),

      (p15:Property {
        id: "property-15",
        name: "Maitama Presidential Duplex",
        price: 45000000,
        description: "High-end luxury duplex with premium facilities.",
        bedrooms: 5
      }),

      (p16:Property {
        id: "property-16",
        name: "Maitama Executive Duplex",
        price: 60000000,
        description: "Exclusive six-bedroom duplex in Maitama.",
        bedrooms: 6
      }),

      // Smaller Maitama properties
      (p17:Property {
        id: "property-17",
        name: "Maitama Compact Apartment",
        price: 500000,
        description: "Compact apartment suitable for a single occupant or couple.",
        bedrooms: 1
      }),

      (p18:Property {
        id: "property-18",
        name: "Maitama Two Bedroom Apartment",
        price: 2500000,
        description: "Modern two-bedroom apartment in Maitama.",
        bedrooms: 2
      }),

      (p19:Property {
        id: "property-19",
        name: "Maitama Three Bedroom Apartment",
        price: 3500000,
        description: "Comfortable three-bedroom apartment in Maitama.",
        bedrooms: 3
      })

  

      CREATE

      (p1)-[:HAS_TYPE]->(apartment),
      (p1)-[:LOCATED_IN]->(wuse),
      (p1)-[:HAS_AMENITY]->(parking),
      (p1)-[:NEARBY]->(hospital),

   
      (p2)-[:HAS_TYPE]->(apartment),
      (p2)-[:LOCATED_IN]->(wuse),
      (p2)-[:HAS_AMENITY]->(parking),
      (p2)-[:HAS_AMENITY]->(security),
      (p2)-[:NEARBY]->(school),

      
      (p3)-[:HAS_TYPE]->(apartment),
      (p3)-[:LOCATED_IN]->(wuse),
      (p3)-[:HAS_AMENITY]->(parking),
      (p3)-[:HAS_AMENITY]->(security),
      (p3)-[:HAS_AMENITY]->(generator),
      (p3)-[:NEARBY]->(hospital),

     
      (p4)-[:HAS_TYPE]->(duplex),
      (p4)-[:LOCATED_IN]->(wuse),
      (p4)-[:HAS_AMENITY]->(parking),
      (p4)-[:HAS_AMENITY]->(security),
      (p4)-[:NEARBY]->(school),

    
      (p5)-[:HAS_TYPE]->(duplex),
      (p5)-[:LOCATED_IN]->(wuse),
      (p5)-[:HAS_AMENITY]->(parking),
      (p5)-[:HAS_AMENITY]->(security),
      (p5)-[:HAS_AMENITY]->(generator),
      (p5)-[:NEARBY]->(hospital),
      (p5)-[:NEARBY]->(school),


      (p6)-[:HAS_TYPE]->(apartment),
      (p6)-[:LOCATED_IN]->(garki),
      (p6)-[:HAS_AMENITY]->(parking),
      (p6)-[:NEARBY]->(hospital),

     
      (p7)-[:HAS_TYPE]->(apartment),
      (p7)-[:LOCATED_IN]->(garki),
      (p7)-[:HAS_AMENITY]->(parking),
      (p7)-[:HAS_AMENITY]->(security),
      (p7)-[:NEARBY]->(school),

   
      (p8)-[:HAS_TYPE]->(apartment),
      (p8)-[:LOCATED_IN]->(garki),
      (p8)-[:HAS_AMENITY]->(parking),
      (p8)-[:HAS_AMENITY]->(security),
      (p8)-[:HAS_AMENITY]->(generator),
      (p8)-[:NEARBY]->(hospital),

    
      (p9)-[:HAS_TYPE]->(duplex),
      (p9)-[:LOCATED_IN]->(garki),
      (p9)-[:HAS_AMENITY]->(parking),
      (p9)-[:HAS_AMENITY]->(security),
      (p9)-[:NEARBY]->(school),

   
      (p10)-[:HAS_TYPE]->(duplex),
      (p10)-[:LOCATED_IN]->(garki),
      (p10)-[:HAS_AMENITY]->(parking),
      (p10)-[:HAS_AMENITY]->(security),
      (p10)-[:HAS_AMENITY]->(generator),
      (p10)-[:NEARBY]->(hospital),
      (p10)-[:NEARBY]->(school),


      (p11)-[:HAS_TYPE]->(apartment),
      (p11)-[:LOCATED_IN]->(maitama),
      (p11)-[:HAS_AMENITY]->(parking),
      (p11)-[:NEARBY]->(hospital),

  
      (p12)-[:HAS_TYPE]->(apartment),
      (p12)-[:LOCATED_IN]->(maitama),
      (p12)-[:HAS_AMENITY]->(parking),
      (p12)-[:HAS_AMENITY]->(security),
      (p12)-[:NEARBY]->(school),

     
    
      (p13)-[:HAS_TYPE]->(apartment),
      (p13)-[:LOCATED_IN]->(maitama),
      (p13)-[:HAS_AMENITY]->(parking),
      (p13)-[:HAS_AMENITY]->(security),
      (p13)-[:HAS_AMENITY]->(generator),
      (p13)-[:NEARBY]->(hospital),
      (p13)-[:NEARBY]->(school),

    
      (p14)-[:HAS_TYPE]->(duplex),
      (p14)-[:LOCATED_IN]->(maitama),
      (p14)-[:HAS_AMENITY]->(parking),
      (p14)-[:HAS_AMENITY]->(security),
      (p14)-[:NEARBY]->(hospital),

     
      (p15)-[:HAS_TYPE]->(duplex),
      (p15)-[:LOCATED_IN]->(maitama),
      (p15)-[:HAS_AMENITY]->(parking),
      (p15)-[:HAS_AMENITY]->(security),
      (p15)-[:HAS_AMENITY]->(generator),
      (p15)-[:NEARBY]->(hospital),
      (p15)-[:NEARBY]->(school),

      // Property 16
      (p16)-[:HAS_TYPE]->(duplex),
      (p16)-[:LOCATED_IN]->(maitama),
      (p16)-[:HAS_AMENITY]->(parking),
      (p16)-[:HAS_AMENITY]->(security),
      (p16)-[:HAS_AMENITY]->(generator),
      (p16)-[:NEARBY]->(hospital),
      (p16)-[:NEARBY]->(school),

    
      (p17)-[:HAS_TYPE]->(apartment),
      (p17)-[:LOCATED_IN]->(maitama),
      (p17)-[:HAS_AMENITY]->(parking),

      (p18)-[:HAS_TYPE]->(apartment),
      (p18)-[:LOCATED_IN]->(maitama),
      (p18)-[:HAS_AMENITY]->(parking),
      (p18)-[:HAS_AMENITY]->(security),

   
      (p19)-[:HAS_TYPE]->(apartment),
      (p19)-[:LOCATED_IN]->(maitama),
      (p19)-[:HAS_AMENITY]->(parking),
      (p19)-[:HAS_AMENITY]->(security),
      (p19)-[:HAS_AMENITY]->(generator)
    `);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();