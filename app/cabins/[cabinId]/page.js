import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}
export async function generateStaticParams(params) {
  const cabins = await getCabins();
  const cabinIds = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return cabinIds;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 lg:py-3 lg:px-10 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-auto lg:scale-[1.15] lg:-translate-x-3">
          <Image
            fill
            className="object-cover"
            src={image}
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 lg:mb-5 lg:translate-x-[-254px] bg-primary-950 p-4 sm:p-5 lg:p-6 pb-1 w-full lg:w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-base sm:text-lg text-primary-300 mb-6 sm:mb-8 lg:mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base sm:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
