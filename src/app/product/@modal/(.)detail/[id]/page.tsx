import Modal from "@/components/core/Modal";
import { getData } from "@/services/product";

export default async function DetailProductPage(props: {
  params: { id: string };
}) {
  const { params } = props;
  const products = await getData(
    "http://localhost:3000/api/product/?id=" + params.id
  );
  // console.log(products.data);
  return (
    <Modal>
      <img
        src={products.data.image}
        alt=""
        className="w-full object-cover aspect-square"
      />
      <div className="bg-white p-4 px-6">
        <h1 className="text-3xl font-bold">{products.data.title}</h1>
        <p>{products.data.price}</p>
      </div>
    </Modal>
  );
}
