import { FloatingDemo } from '@/components/FloatingDemo'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ProductDemo } from '@/components/sections/ProductDemo'
import { Features } from '@/components/sections/Features'
import { WhyStash } from '@/components/sections/WhyStash'
import { Screens } from '@/components/sections/Screens'
import { DownloadSection } from '@/components/sections/DownloadSection'
import { FAQ } from '@/components/sections/FAQ'
import { Footer } from '@/components/sections/Footer'
import { JsonLd } from '@/components/JsonLd'
import { fetchLatestRelease } from '@/lib/github'

export default async function Home() {
  const release = await fetchLatestRelease()

  return (
    <>
      <JsonLd version={release.version} />
      <Navbar downloadUrl={release.downloadUrl ?? release.url} />
      <main className="flex-1">
        <Hero
          version={release.version}
          downloadUrl={release.downloadUrl ?? release.url}
        />
        <ProductDemo />
        <Features />
        <WhyStash />
        <Screens />
        <DownloadSection
          version={release.version}
          downloadUrl={release.downloadUrl ?? release.url}
          releaseUrl={release.url}
        />
        <FAQ />
      </main>
      <Footer />
      <FloatingDemo />
    </>
  )
}
