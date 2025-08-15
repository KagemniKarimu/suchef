// Mock AI responses for demo purposes
export const mockResponses = {
  learn: [
    "Ah, you want to know about knife skills? Let me tell you, honey - a sharp knife is a safe knife! Hold it like you're shaking hands with an old friend, firm but relaxed. Rock that blade, don't saw. You following me?",
    "Temperature control, sweetie, that's what separates the home cooks from the chefs. Medium-high isn't just a number - it's when your oil shimmers like water on a hot sidewalk. That's when you know it's ready.",
    "Now, let me tell you about seasoning - it's like jazz, you build it in layers. A little at the beginning, taste as you go, finish at the end. My grandmother always said, 'You can always add, but you can't take away!'",
  ],
  
  nyanya: [
    "Mmm, let me see what we're working with here... Chicken, garlic, and some tired looking veggies? Baby, we're making a one-pot wonder! Sauté that garlic till it sings, throw in the chicken till it's golden, then let those vegetables join the party. No stock? Just use water with a little soy sauce - works every time!",
    "Ooh, pasta and not much else? Honey, let me introduce you to 'aglio e olio' - fancy name for garlic and oil, but it'll make you feel like you're dining in Rome! Slice that garlic thin as whispers, let it dance in olive oil, toss with pasta and whatever cheese you got hiding in that fridge.",
    "Rice, eggs, and leftover vegetables? Sugar, that's a fried rice waiting to happen! Day-old rice is actually better - learned that from a street vendor in Bangkok. Scramble those eggs first, set them aside, then get that rice nice and crispy. Everything else follows!",
  ],
  
  randomizer: [
    "Ooh, Korean food in under 30 minutes? Honey, let me tell you about this kimchi fried rice that'll knock your socks clean off! You got 20 minutes tops, and it's better than takeout. I learned this from a street vendor in Seoul - sweetest lady you ever met. She said the secret is letting the kimchi get a little crispy first.",
    "Italian comfort food for a vegetarian? Baby, let me sing you the song of 'Pasta e Fagioli'! It's beans and pasta in a tomato hug, and it'll warm you from the inside out. My friend Maria from Tuscany taught me this - she said 'When in doubt, add more garlic!'",
    "Quick Mexican breakfast? Mhmm, we're making migas! Scrambled eggs with crispy tortilla chips, jalapeños, and cheese. Takes 10 minutes and tastes like a fiesta. Learned this from a cook in Austin - now that man could make eggs sing!",
  ],
  
  guide: [
    "Alright sweetie, let's make this carbonara! First, we're gonna get that water boiling - and I mean REALLY boiling, like it's mad at you. Salt it till it tastes like the sea. While that's happening, let's get your guanciale nice and crispy - about 5 minutes. You'll know it's ready when it looks like little golden nuggets.",
    "Now don't worry if it looks a little messy at first - that's just the flour saying hello to the butter. Keep stirring, it'll come together. See how it's starting to look smooth? That's your roux, baby! The foundation of all great sauces. There you go! Look at you, cooking like you were born with a spoon in your hand!",
    "Time to flip that pancake! Don't be scared - confidence is the secret ingredient. Wait for those bubbles to pop on top, then slide your spatula under... and FLIP! Even if it's not perfect, it'll taste just as good. My first thousand pancakes looked like maps of unknown countries!",
  ],
  
  review: [
    "Well now, let's take a look at what we've got here... This carbonara recipe? Honey, it's got good bones, but we need to talk about that cream. Traditional carbonara doesn't use cream - just eggs, cheese, and pasta water. But if you like it creamy, I won't judge - just call it 'American style' and own it! I'm giving this 4 out of 5 stars.",
    "This chicken tikka masala is singing my song! The spice blend is perfect, and marinating overnight? That's the move of someone who knows their way around flavor. Only thing I'd add is a splash of cream at the end to mellow it out. But that's just me - you do you! Solid 4.5 stars from Nyanya.",
    "Now this cornbread recipe... Sugar, this is EXACTLY how my grandmother made it! That little bit of honey instead of all sugar? That's the secret right there. And using a cast iron skillet? You're speaking my language! This gets 5 stars and a place in my personal collection!",
  ],
}

export type ResponseCategory = keyof typeof mockResponses

export function getRandomResponse(category: ResponseCategory): string {
  const responses = mockResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}