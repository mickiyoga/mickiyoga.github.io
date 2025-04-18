export const prerender = false;

export interface Client {
  name: string;
  logo: string;
  url: string;
}

export function load() {
  const logos: Record<string, string> = import.meta.glob(
    "/src/lib/assets/clients_256px/**/*.{jpg,jpeg,png,gif,webp,svg,avif,heif,tiff}",
    { eager: true, import: "default", query: { enhanced: true } }
  );

  const clients: Client[] = [
    {
      name: "RMIT University",
      logo: "/src/lib/assets/clients_256px/rmit.png",
      url: "https://www.rmit.edu.au/about/our-locations-and-facilities/facilities/rmit-sports-centre/group-fitness-classes"
    },
    {
      name: "Fernwood Fitness",
      logo: "/src/lib/assets/clients_256px/fernwood.png",
      url: "https://www.fernwoodfitness.com.au/"
    },
    {
      name: "Kundalini House",
      logo: "/src/lib/assets/clients_256px/kundalini.png",
      url: "https://kundalinihouse.com.au/"
    },
    {
      name: "Urban Athletic",
      logo: "/src/lib/assets/clients_256px/urban_athletic.png",
      url: "https://www.urbanathletic.com.au/"
    },
    {
      name: "Adobe",
      logo: "/src/lib/assets/clients_256px/adobe.png",
      url: "https://blog.adobe.com/en/publish/2016/08/17/taking-wellness-to-heart"
    },
    {
      name: "Kai Ming Preschools",
      logo: "/src/lib/assets/clients_256px/kai_ming.png",
      url: "https://kaiming.org/"
    },
    {
      name: "Hot 8 Yoga",
      logo: "/src/lib/assets/clients_256px/hot_8.png",
      url: "https://www.hot8yoga.com/"
    },
    {
      name: "CorePower Yoga",
      logo: "/src/lib/assets/clients_256px/corepower.png",
      url: "https://www.corepoweryoga.com/"
    },
    {
      name: "Crunch",
      logo: "/src/lib/assets/clients_256px/crunch.png",
      url: "https://www.crunch.com/"
    }
  ].map((client) => ({
    ...client,
    logo: logos[client.logo]
  }));

  return {
    clients
  };
}
