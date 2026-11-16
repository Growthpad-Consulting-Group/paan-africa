

export default function MasterclassFilters() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gradient-to-br from-[#F25849]/10 to-[#F25849]/5 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#F25849] mb-2">20+</div>
            <div className="text-gray-600">Expert Instructors</div>
          </div>
          <div className="bg-gradient-to-br from-[#84C1D9]/10 to-[#84C1D9]/5 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#84C1D9] mb-2">100+</div>
            <div className="text-gray-600">Agencies Trained</div>
          </div>
          <div className="bg-gradient-to-br from-[#F2B706]/10 to-[#F2B706]/5 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#F2B706] mb-2">25+</div>
            <div className="text-gray-600">Countries Reached</div>
          </div>
          <div className="bg-gradient-to-br from-[#172840]/10 to-[#172840]/5 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#172840] mb-2">95%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
