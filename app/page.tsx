import { Header } from "@/components/mercado-livre/Header"
import { ProductGallery } from "@/components/mercado-livre/ProductGallery"
import { ProductInfo } from "@/components/mercado-livre/ProductInfo"
import { RelatedProducts } from "@/components/mercado-livre/RelatedProducts"
import { SellerProfile } from "@/components/mercado-livre/SellerProfile"
import { ProductDescription } from "@/components/mercado-livre/ProductDescription"
import { Footer } from "@/components/mercado-livre/Footer"

export default function MercadoLivrePage() {
  return (
    <div className="min-h-screen bg-[#EBEBEB] overflow-x-hidden">
      <Header />
      
      <main className="max-w-6xl mx-auto">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <ProductGallery />
          <ProductInfo />
          <div className="h-2 bg-[#EBEBEB]" />
          <RelatedProducts />
          <div className="h-2 bg-[#EBEBEB]" />
          <SellerProfile />
          <div className="h-2 bg-[#EBEBEB]" />
          <ProductDescription />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_380px] lg:gap-4 lg:py-4 lg:px-4">
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <ProductGallery />
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <ProductDescription />
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <ProductInfo />
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <SellerProfile />
            </div>
          </div>
        </div>

        {/* Related Products - Desktop */}
        <div className="hidden lg:block px-4 pb-4">
          <div className="bg-white rounded-lg overflow-hidden">
            <RelatedProducts />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
