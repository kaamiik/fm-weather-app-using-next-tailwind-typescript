import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  console.log("API route called with query:", query);

  if (!query || query.length < 1) {
    console.log("Query invalid or too short, returning empty array");
    return NextResponse.json([]);
  }

  try {
    console.log("Making request to Open-Meteo API with query:", query);

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=5&language=en&format=json`,
      { next: { revalidate: 300 } }
    );

    console.log("Open-Meteo API response status:", response.status);

    if (!response.ok) {
      console.error(
        "Open-Meteo API error:",
        response.status,
        response.statusText
      );
      throw new Error("Failed to fetch locations");
    }

    const data = await response.json();
    console.log("Open-Meteo API data:", data);

    // Ensure we're returning the results array
    return NextResponse.json(data.results || []);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json([], { status: 500 });
  }
}
