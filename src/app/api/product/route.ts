import { retriveData, retriveDataById } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 1,
    title: "Sepatu Adidas",
    price: 200000,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-shoe-66RGqF.png",
  },
  {
    id: 2,
    title: "Sepatu Nike",
    price: 250000,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e6df1da-0701-4734-8615-5097961e863d/dunk-low-retro-shoes-bCzchX.png",
  },
  {
    id: 3,
    title: "Sepatu Nike V.2",
    price: 1200000,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7cab2c77-73f1-4121-a2c7-6d08d0363e1c/jordan-max-aura-5-shoes-ZBZ4Pz.png",
  },
  {
    id: 4,
    title: "Sepatu Nike V.4",
    price: 1200000,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/33220c81-c71e-4b20-b39d-db46c56f4e85/jumpman-mvp-shoes-JV1HCs.png",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  //   console.log(searchParams.get("id"));

  if (id) {
    const dataDetail = await retriveDataById("products", id);
    if (dataDetail) {
      return NextResponse.json({
        status: 200,
        message: "success",
        data: dataDetail,
      });
    }
    // console.log(dataDetail);

    return NextResponse.json({
      status: 404,
      message: "Not Found",
      data: {},
    });
  }

  const products = await retriveData("products");

  return NextResponse.json({ status: 200, message: "success", data: products });
}
