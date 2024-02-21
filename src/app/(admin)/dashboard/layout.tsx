export default function Layout({
  children,
  product,
  analytic,
}: {
  children: React.ReactNode;
  product: React.ReactNode;
  analytic: React.ReactNode;
}) {
  return (
    <div className="p-5">
      <div>{children}</div>
      <div className="flex justify-center items-center mt-3 rounded-md">
        <div className="bg-gray-300 w-full h-96 mr-2">{product}</div>
        <div className="bg-gray-300 w-full">{analytic}</div>
      </div>
    </div>
  );
}
