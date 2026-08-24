import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/neo4j";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
   
    const recommendations = await runQuery(
      `
      MATCH (p:Property {id: $id})-[:HAS_AMENITY]->(am:Amenity)<-[:HAS_AMENITY]-(other:Property)
      WHERE other.id <> $id
      WITH other, collect(DISTINCT am.name) AS amenities
      WHERE size(amenities) >= 2
      MATCH (other)-[:LOCATED_IN]->(area:Area)

      RETURN
        other.id AS id,
        other.name AS name,
        other.price AS price,
        other.bedrooms AS bedrooms,
        area.name AS area,
        amenities,
        size(amenities) AS matchScore
      ORDER BY matchScore DESC, other.price ASC
      LIMIT 5
      `,
      { id },
    );

    return NextResponse.json({ properties: recommendations });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { message: "Failed to fetch recommendations" },
      { status: 500 },
    );
  }
}