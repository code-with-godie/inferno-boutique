const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
export const createUser = async (newUser) => {
  const res = await fetch(`${BASE_URL}/api/v1/users`, {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error(res.statusText);
  const { user } = await res.json();
  return user;
};
export const getUser = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(res.statusText);
    const { user } = await res.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const updateUserById = async (newUser) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/users/${newUser?._id}`, {
      method: "PATCH",
      body: JSON.stringify(newUser),
    });
    if (!res.ok) throw new Error(res.statusText);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getUsers = async (query, page) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/users?q=${query}&page=${page}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) throw new Error(res.statusText);
    const resJson = await res.json();
    const { count, users } = resJson;
    return { users, count };
  } catch (error) {
    console.log(error);
  }
};
export const getStarts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/starts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(res.statusText);
    const resJson = await res.json();
    const { starts } = resJson;
    return starts;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const deleteUserById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/users/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
export const deleteProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/products/${id}`, {
    next: { revalidate: 60 },
    method: "DELETE",
  });
  return await res.json();
};
export const getProducts = async (query, page) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/products?q=${query}&page=${page}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return undefined;

    const { count, products } = await res.json();
    return { count, products };
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(res.statusText);

    const { product } = await res.json();
    return product;
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (product) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/products`, {
      method: "POST",
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error(res.statusText);
    return true;
  } catch (error) {
    throw error;
  }
};
export const getPopularProduct = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/products/popular`, {
    next: { tags: "popular", revalidate: 60 },
  });
  if (!res.ok) return undefined;
  const { products } = await res.json();
  return products;
};
export const getNewArrivals = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/products/arrivals`, {
    next: { tags: "arrivals", revalidate: 60 },
  });
  if (!res.ok) return undefined;
  const { products } = await res.json();
  return products;
};
export const getCategoryFilters = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/products/filters`, {
    next: { tags: "filters", revalidate: 60 },
  });
  if (!res.ok) return undefined;
  const { starts } = await res.json();
  return starts;
};
export const getCategoryProducts = async ({ filters }) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/products/category?category=${filters?.category}&brand=${filters?.brand}&gender=${filters?.gender}&min=${filters?.min}&max=${filters?.max}&sort=${filters?.sort}`,
    {
      next: { tags: "category", revalidate: 60 },
    }
  );

  if (!res.ok) return undefined;
  const { products } = await res.json();
  return products;
};

export const getFeaturedProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/v1/products/featured`, {
    next: { tags: "featured" },
    cache: "no-store",
  });

  if (!res.ok) return undefined;
  const { products } = await res.json();
  return products;
};
export const createStripeIntent = async (body) => {
  const res = await fetch(`${BASE_URL}/api/v1/create-payment-intent`, {
    method: "POST",
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  if (!res.ok) return undefined;
  const resJson = await res.json();
  return resJson;
};

export const updateProductUserById = async (newProduct) => {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/products/${newProduct?._id}`, {
      method: "PATCH",
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) throw new Error(res.statusText);
    return true;
  } catch (error) {
    throw error;
  }
};
