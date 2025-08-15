import AnimatedTitle from "./components/AnimatedTitle"
import HeroDescription from "./components/HeroDescription"
import InteractiveMascot from "./components/InteractiveMascot"
import StaggeredGridBackground from "./components/StaggeredGridBackground"
import CookingButton from "./components/CookingButton"

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <StaggeredGridBackground />
      <div className="relative z-10 flex flex-col items-center pt-24 md:pt-32 p-8">
        <div className="border-2 border-orange-500 rounded-3xl p-8 md:p-12 flex flex-col items-center gap-12">
          <AnimatedTitle />
          <HeroDescription />
          <InteractiveMascot />
          <CookingButton />
        </div>
      </div>
    </div>
  )
}