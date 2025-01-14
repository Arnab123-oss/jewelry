import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { ImSpinner } from "react-icons/im";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newProduct] = useCreateProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const previews: string[] = [];
      const fileArray: File[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            previews.push(reader.result);
            fileArray.push(file);

            if (previews.length === files.length) {
              setPhotoPrev(previews);
              setPhotos(fileArray);
            }
          }
        };
      });
    }
  };
  // : Promise<void>

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !stock || !photos || !category) return;
    setIsProcessing(true);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("category", category);
    formData.set("stock", stock.toString());
    formData.set("price", price.toString());
    photos.forEach((photo) => {
      formData.append("photos", photo); // Append multiple photos
    });

    let userId;
    if (user) userId = user._id;

    const res = await newProduct({ id: userId!, formdata: formData });
    console.log(res);

    if (res.data?.message || res.error) setIsProcessing(false);

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                multiple
                onChange={changeImageHandler}
              />
            </div>

            {photoPrev.length > 0 && (
              <div className="photo-previews">
                {photoPrev.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{ width: "50px", margin: "5px" }}
                  />
                ))}
              </div>
            )}
            <button type="submit">
              {isProcessing ? <ImSpinner className="loading-icon" /> : "Create"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
