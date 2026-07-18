function StatCard({ title, value }) {
  return (
    <div className="bg-[#2B2D31] rounded-xl p-6 shadow-md">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-3 text-white">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;