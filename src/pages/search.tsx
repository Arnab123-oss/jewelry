import { useState } from "react";
import ProductCard from "../components/product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading: productLoading, data: serachedData } =
    useSearchProductsQuery({ search, category, sort, page, price: maxPrice });
  console.log(serachedData);

  // const handleSearchChange = (e) => {
  //   setSearch(e.target.value);
  // };

  const AddToCartHandlear = () => {};

  const isPreviousPage = page > 1;
  const isNextPage = page < 4;

  if (isError) toast.error((error as CustomError).data.message);

  return (
    <div className="product-sarch-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="dsc">Price: High to Low</option>
            {/* <option value="rating-asc">Rating: Low to High</option>
              <option value="rating-desc">Rating: High to Low</option> */}
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            value={maxPrice}
            min={100}
            max={1000}
            type="range"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          ></input>
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((category) => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Product</h1>
        <input
          type="text"
          placeholder="Search by name...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search-product-list">
          <ProductCard
            productId="4h4j74jh2"
            name="Punjabi kalka design for men "
            price={2543}
            stock={254}
            photo="https://i.pinimg.com/originals/a6/a1/dc/a6a1dc0f04d00cdcdbc1d89a0dad623c.jpg"
            handler={AddToCartHandlear}
          />
          <ProductCard
            productId="4h4j74jh2"
            name="Punjabi kalka design for men "
            price={2543}
            stock={254}
            photo="https://i.pinimg.com/originals/a6/a1/dc/a6a1dc0f04d00cdcdbc1d89a0dad623c.jpg"
            handler={AddToCartHandlear}
          />
        </div>

        <article>
          <button
            disabled={!isPreviousPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            prev
          </button>
          <span>
            {page} of {4}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
