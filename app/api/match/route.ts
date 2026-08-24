import { NextRequest, NextResponse } from "next/server";
import { runQuery } from "@/lib/neo4j";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { budget, bedrooms, area, amenity } = body;

    const properties = runQuery(
      `
        MATCH (p:Property)
        MATCH (p)-[:LOCATED_IN]->(a:Area)
        MATCH (p)-[:HAS_AMENITY]->(am:Amenity)
        WHERE
        p.price <= $budget AND p.bedrooms >= $bedrooms AND a.name = $area AND am.name = $amenity
          OPTIONAL MATCH (p)-[:HAS_TYPE]->(type:PropertyType)

      RETURN
        p.id AS id,
        p.name AS name,
        p.price AS price,
        p.bedrooms AS bedrooms,
        a.name AS area,
        type.name AS type,
        collect(DISTINCT am.name) AS amenities

      ORDER BY p.price ASC
        
        `,
      {
        budget: Number(budget),
        bedrooms: Number(bedrooms),
        area: area,
        amenity: amenity,
      },
    );


     if (!properties || (await properties).length === 0) {
      return NextResponse.json(
        {
          message: "Match not found",
          properties: [],
        },
        {
          status: 404,
        },
      );
    }
    console.log("properties", await properties);
    return NextResponse.json( {properties:(await properties)});
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to find matching properties",
      },
      {
        status: 500,
      },
    );
  }
}
