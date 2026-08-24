import { NextResponse } from "next/server";
import { runQuery } from "@/lib/neo4j";

export async function GET() {
  try {
    const properties = await runQuery(`
        MATCH (p:Property)
        OPTIONAL MATCH (p)-[:HAS_TYPE]->(type:PropertyType)
        OPTIONAL MATCH (p)-[:LOCATED_IN]->(area:Area)
        OPTIONAL MATCH (p)-[:HAS_AMENITY]->(amenity:Amenity)
        OPTIONAL MATCH (p)-[:NEARBY]->(place:Place)

        RETURN 
        p.id AS id,
        p.name AS name,
        p.price AS price,
        p.bedrooms AS bedrooms,
        type.name AS type,
        area.name AS area,
        collect(DISTINCT amenity.name) AS amenities,
        collect(DISTINCT place.name) AS nearbyPlaces

        ORDER BY p.price ASC
        `);

    return NextResponse.json(properties);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 },
    );
  }
}