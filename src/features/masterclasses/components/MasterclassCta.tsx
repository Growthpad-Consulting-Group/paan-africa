import Link from "next/link";

export default function MasterclassCta() {
  return (
    <section className="bg-gradient-to-r from-[#F25849] to-[#D6473C] py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Elevate Your Agency?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Join thousands of African agencies who have transformed their businesses through PAAN Masterclasses
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('masterclasses-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-[#F25849] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Browse All Masterclasses
          </button>
          <Link 
            href="/contact-us"
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#F25849] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
