import prisma from "../../../prisma/client.ts";

export default async function handler(req, res) {
  const { id } = req.query; // `id` will be available as a parameter in the request
  const query = req.url.includes("FETCH_PRODUCT"); // Check if the query parameter is FETCH_PRODUCT

  try {
    if (query) {
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await prisma.product.findFirst({
        where: { id: Number(id) }, // Adjust based on your data model
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ product });
    }

    return res.status(400).json({ message: "Invalid endpoint" });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
