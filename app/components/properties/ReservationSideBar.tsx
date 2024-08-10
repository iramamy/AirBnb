const ReservationSideBar = () => {
  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="text-2xl mb-5">$200 per night</h2>

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="block font-bold text-xs mb-2">Guests</label>
        <select className="text-sm rounded-lg w-full p-2 bg-white border">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">5</option>
        </select>
      </div>
      <button className="w-full mb-6 py-6 text-center text-white bg-airbnb rounded-xl hover:bg-airbnb-dark">
        Book
      </button>

      <div className="mb-4 flex justify-between align-center">
        <span>$200 x 3 nights </span>
        <span>$600 </span>
      </div>
      <div className="mb-4 flex justify-between align-center">
        <span>Fee </span>
        <span>$10 </span>
      </div>
      <hr />
      <div className="my-4 flex justify-between align-center">
        <span>Total: </span>
        <span>$610 </span>
      </div>
    </aside>
  );
};

export default ReservationSideBar;
