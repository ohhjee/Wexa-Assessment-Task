import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/neo4j";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const similar = await runQuery(
      `
      MATCH (p:Property {id: $id})-[:NEARBY]->(place:Place)<-[:NEARBY]-(other:Property)
      WHERE other.id <> $id
      MATCH (other)-[:LOCATED_IN]->(area:Area)
      OPTIONAL MATCH (other)-[:HAS_TYPE]->(type:PropertyType)
      OPTIONAL MATCH (other)-[:HAS_AMENITY]->(amenity:Amenity)

      RETURN DISTINCT
        other.id AS id,
        other.name AS name,
        other.price AS price,
        other.bedrooms AS bedrooms,
        area.name AS area,
        type.name AS type,
                collect(DISTINCT amenity.name) AS amenities,
         collect(DISTINCT  place.name) AS nearbyPlaces
      ORDER BY other.price ASC
      LIMIT 5
      `,
      { id },
    );

    return NextResponse.json({ properties: similar });
  } catch (error) {
    console.error("Error fetching similar properties:", error);
    return NextResponse.json(
      { message: "Failed to fetch similar properties" },
      { status: 500 },
    );
  }
}
