export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  readMinutes: number;
  publishedOn: string;
  tag: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'the-art-of-baking',
    title: 'The Art of Baking',
    tag: 'Technique',
    cover: 'img/gallery/img-6.webp',
    readMinutes: 5,
    publishedOn: '2024-02-12',
    excerpt:
      'Baking is both an art and a science. It rewards precision, patience and a good understanding of ingredients. Here are the habits that changed my results the most.',
    body: [
      'Baking is both an art and a science. It requires precision, patience and a good understanding of what each ingredient is doing. Indian kitchens have always baked more than we give them credit for: naan slapped onto a tandoor wall, nankhatai in a tin over coals, the Goan poee that rises overnight. The principles are the same whether you are making a brioche or a batch of bhature.',
      'Weigh, do not scoop. A cup of flour can vary by 30 grams depending on how it was packed, and that difference is the gap between a soft paratha and a tough one. A cheap digital scale is the single biggest upgrade a home baker can make.',
      'Temperature is an ingredient. Cold butter makes flaky layers; room-temperature butter makes a tender crumb; melted butter makes something chewy. Yogurt straight from the fridge slows a yeasted dough down by an hour. Learn what each state does and you stop guessing.',
      'Finally, rest everything. Dough that rests hydrates fully and rolls without fighting back. Gulab jamun dough that rests fries without cracking. Most baking disasters are just impatience with a good recipe.',
    ],
  },
  {
    slug: 'exploring-culinary-traditions',
    title: 'Exploring Culinary Traditions',
    tag: 'Regions',
    cover: 'img/gallery/img-5.webp',
    readMinutes: 6,
    publishedOn: '2024-03-04',
    excerpt:
      'Every region of India has its own grammar of spice. Join me on a tour from the mustard oil of Kashmir to the coconut of the Konkan coast.',
    body: [
      'Every culture has its own culinary traditions, and India has a dozen of them under one flag. The country does not have a national cuisine so much as a federation of them, and the fastest way to understand a region is to look at its fat, its souring agent and its staple grain.',
      'In the north the fat is ghee and mustard oil, the souring agent is yogurt or amchur, and the grain is wheat. That is why rogan josh thickens with yogurt and why every meal ends with a roti. Travel east to Bengal and the fat is still mustard oil but the souring turns to tamarind and the staple becomes rice; fish and the sweetness of chhena desserts follow naturally.',
      'The west coast runs on coconut. Goan fish curry, Malvani chicken and Kerala stew all begin with grated coconut ground into a masala, soured with kokum or tamarind, and finished with coconut oil. Head inland to Maharashtra and Gujarat and peanuts, jaggery and gram flour take over: pav bhaji, dhokla, and the sweet-and-sour balance that defines Gujarati thali.',
      'The south is the most varied of all. Tamil cooking leans on tamarind and curry leaves, Andhra on fierce red chillies, Hyderabad on the Mughal dum technique it inherited and then made its own. Once you know the grammar, every unfamiliar dish starts to make sense.',
    ],
  },
  {
    slug: 'mastering-the-grill',
    title: 'Mastering the Grill: Tandoor Secrets',
    tag: 'Technique',
    cover: 'img/gallery/img-3.webp',
    readMinutes: 5,
    publishedOn: '2024-04-18',
    excerpt:
      'You do not need a clay oven to get tandoori results. The real secrets are a two-stage marinade, very high heat and knowing when to stop.',
    body: [
      "Grilling is more than cooking; it is a way of eating together. The tandoor is India's great grill, a clay oven that runs at 400 C and cooks a kebab in minutes while the smoke does the seasoning. Almost nobody has one at home, but the results are reproducible with a gas flame and a heavy pan.",
      'Start with a two-stage marinade. The first stage is acid and salt only: lemon juice, salt and a little chilli rubbed into deep cuts for twenty minutes. This seasons the meat and opens it up. The second stage is thick hung yogurt carrying the spices, which clings to the surface and chars instead of sliding off. Thin yogurt is the most common reason tandoori chicken comes out pale.',
      'Heat is non-negotiable. Preheat the oven as hot as it goes, use a rack so air circulates, and resist opening the door. For paneer and vegetables, a cast-iron pan on the highest flame gets closer to the tandoor than a medium grill ever will.',
      'Finish with smoke. Hold cooked pieces over an open flame for a few seconds, or place a hot piece of charcoal in a small bowl inside the covered pot and drizzle it with ghee. Five minutes of dhungar smoke turns a good kebab into a restaurant one.',
    ],
  },
  {
    slug: 'seasonal-delights-winter-recipes',
    title: 'Seasonal Delights: Winter Recipes',
    tag: 'Seasonal',
    cover: 'img/gallery/img-10.webp',
    readMinutes: 4,
    publishedOn: '2024-11-20',
    excerpt:
      'As the air turns cold, Indian kitchens turn to sarson, gajar and slow-simmered dals. These are the dishes worth waiting a whole year for.',
    body: [
      'As the weather changes, so do our cravings. Indian winter cooking is built around produce that only shows up for a few months: mustard greens, red carrots, fresh green chickpeas and the first sugarcane jaggery of the season.',
      'Sarson ka saag with makki ki roti is the obvious place to start. The greens are simmered for an hour with spinach and bathua, then thickened with maize flour and finished with a tempering of ghee, garlic and dried red chillies. It is a dish that rewards a lazy Sunday.',
      'Gajar ka halwa needs the red Delhi carrots that arrive in December; the orange ones work but taste of less. Grate them fine, cook them down in full-fat milk until almost dry, then add ghee, sugar and cardamom at the very end so the sugar does not stop the carrots softening.',
      'Dal makhani, the richest dal of all, is a winter dish too. The long simmer that makes it creamy warms the kitchen, and the butter and cream that finish it make sense when it is cold outside. Make a big pot; it is better on the second day.',
    ],
  },
  {
    slug: 'the-joy-of-comfort-food',
    title: 'The Joy of Comfort Food',
    tag: 'Stories',
    cover: 'img/gallery/img-9.webp',
    readMinutes: 4,
    publishedOn: '2025-01-09',
    excerpt:
      'Khichdi, rajma chawal, dal and rice: the dishes nobody photographs but everybody comes home to. A short celebration of the food that fixes a bad day.',
    body: [
      'In times of joy or sorrow, comfort food has the power to settle things. Every Indian household has a version of it, and it is almost never the dish served to guests. It is khichdi when you are unwell, rajma chawal on a Sunday, dal and rice at the end of a long week.',
      'What these dishes share is restraint. They have few ingredients, one pot and no technique that cannot be done half asleep. Khichdi is rice and moong dal cooked soft with turmeric and a spoon of ghee. The whole recipe fits in a sentence, and that is the point.',
      'Comfort food is also where regional identity is strongest. A Bengali thinks of macher jhol and rice, a Tamilian of curd rice with a tempering of mustard seeds, a Gujarati of khichdi with kadhi. Ask someone what they eat when they are sad and you learn where they grew up.',
      'So cook the unglamorous things. Make a big pot of rajma, eat it over two days, and do not photograph it. Some food is for the table, not the feed.',
    ],
  },
];

export const findPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
