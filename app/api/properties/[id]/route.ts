import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/neo4j";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log(id);
  try {
    const properties = runQuery(
      `
        MATCH (p:Property {id:$id})
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
        collect(DISTINCT amenity.name) as amenities,
        collect(DISTINCT {name: place.name, type: place.type}) AS nearbyPlaces
        `,

      {
        id,
      },
    );
    if ((await properties).length === 0) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 },
      );
    }

    // console.log("properties", {properties: });
    return NextResponse.json({ properties: await properties });
  } catch (error) {
    console.error("Error fetching property:", error);

    return NextResponse.json(
      { message: "Failed to fetch property" },
      { status: 500 },
    );
  }
}
