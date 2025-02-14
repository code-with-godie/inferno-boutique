"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  createProduct,
  createUser,
  deleteProductById,
  deleteUserById,
  updateProductUserById,
  updateUserById,
} from "./lib";
export const addUser = async (user) => {
  try {
    await createUser(user);
    revalidatePath("/dashboard/users");
    // redirect('/dashboard/users');
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (user) => {
  try {
    await updateUserById(user);
    revalidatePath("/dashboard/users");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const deleteUser = async (formData) => {
  try {
    const id = formData.get("id");
    await deleteUserById(id);
    revalidatePath("/dashboard/users");
  } catch (error) {
    console.log(error);
  }
};
export const addProduct = async (product) => {
  try {
    const created = await createProduct(product);
    if (created) {
      revalidateTag(["arrivals", "all_products,featured"]);
      revalidatePath("/dashboard/products");
    }
    return true;
  } catch (error) {
    throw error;
  }
};
export const deleteProduct = async (formData) => {
  try {
    const id = formData.get("id");
    await deleteProductById(id);
    revalidatePath("/dashboard/products");
    revalidateTag(["arrivals", "all_products,featured"]);
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (product) => {
  try {
    await updateProductUserById(product);
    revalidatePath("/dashboard/products");
    revalidateTag(["arrivals", "all_products,featured"]);
    return true;
  } catch (error) {
    throw error;
  }
};
