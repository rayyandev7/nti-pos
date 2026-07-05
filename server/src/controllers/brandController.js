import Brand from "../models/brandModel.js";

// Create Brand
export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingBrand = await Brand.findOne({ name });

    if (existingBrand) {
      return res.status(400).json({
        success: false,
        message: "Brand already exists.",
      });
    }

    const brand = await Brand.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Brand created successfully.",
      brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Brand By ID
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand updated successfully.",
      brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};