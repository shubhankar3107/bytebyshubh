export async function POST() {
  return Response.json(
    {
      success: false,
      message: "The contact endpoint has not been implemented yet."
    },
    {
      status: 501
    }
  );
}
