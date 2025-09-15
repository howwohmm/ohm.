import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

// Get all blog posts
export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts: Post[] = [
      {
        slug: 'midnight-motivation',
        meta: {
          title: 'Why does motivation hit at night and vanish by morning?',
          date: '2024-09-15',
          description: 'Exploring the phenomenon of late-night clarity and morning resistance to change.',
          tags: ['motivation', 'psychology', 'self-reflection', 'mobile_notes']
        },
        content: `it always feels so clear at night.

the world slows down, and suddenly, i can see the person i want to become.

the plans, the habits, the bold decisions, it all feels so possible.

and i tell myself, "this is it. tomorrow, everything changes."

but then the morning comes.

and that version of me?

it's like they never existed.

i wake up to stress, deadlines, and this overwhelming weight of "real life."

i think it's because, at night, the noise fades.

there's no pressure, no expectations.

my mind feels free to imagine a different reality.

but when the sun rises, the world pulls me back.

stress hormones, survival instincts, the need to play it safe,

they take over.

maybe it's not about trying to hold on to the midnight version of myself.

maybe it's about taking one thing from those thoughts,

just one idea, one decision, one promise,

and acting on it in the daylight.

because big change doesn't happen all at once.

it happens in the small things we carry forward,

even when the noise returns.`
      },
      {
        slug: 'ohms-brain-at-2am',
        meta: {
          title: 'Ohm\'s Brain at 2Am',
          date: '2024-09-14',
          description: 'A late-night spiral questioning free will, conditioning, and what thoughts are truly our own.',
          tags: ['philosophy', 'late-night thoughts', 'identity', 'authenticity']
        },
        content: `bro, do I even have my own thoughts?

like, for real.

is anything I think actually *mine*?

or am I just a walking collage of every tweet I liked, every podcast I half-listened to, every convo I wasn't even a part of but still absorbed?

I tell myself I see the world differently.

but do I?

or is this just the illusion of individuality?

like, think about it - 

I didn't choose my name.

didn't choose the first language I spoke.

didn't choose the rules I was taught to follow before I even knew what a *rule* was.

I was just placed into a system,

handed a playbook,

and expected to make it work.

school taught me how to find 'x'

but never once made me question *why* x even mattered.

and work?

it's just school but with a paycheck.

they don't ask, *what do you want?*

they ask, *how can you be useful?*

useful.

not happy.

not fulfilled.

just *useful*.

bro, I need to lie down.

and then there's the biggest scam of all - dreams.

"follow your dreams" they say.

but what if the only dreams I've ever had

are the ones I was *allowed* to have?

like 

have I ever dreamt of something that wasn't already an option?

probably not.

so were those dreams ever really *mine*?

or just the best-looking choices from a menu someone else wrote?

bro. my head hurts.

I need water.

...but also 

if I erased all that noise.

the conditioning. the defaults. the *shoulds*.

what would I actually want?

what would ohm choose

if ohm was *truly* free?`
      },
      {
        slug: 'simon-sinek-why-notes',
        meta: {
          title: 'notes i scribbled after watching simon sinek talk about "why"',
          date: '2024-09-13',
          description: 'Mind-bending insights from Simon Sinek\'s golden circle and the power of starting with why.',
          tags: ['leadership', 'purpose', 'simon-sinek', 'notes', 'inspiration']
        },
        content: `*(this broke my brain a little. in a good way)*

- everyone knows *what* they do
- some know *how* they do it
- but almost no one knows *why* they do it

and that's where the whole game flips.

---

we spend our lives screaming what we sell

shouting what we build

pitching what we know

but the ones who move us

they whisper *why*

---

apple isn't different because they make laptops

they're different because they believe in questioning the default

they believe in thinking different

the laptop, the ipod, the phone - they're just proof of the belief

and that hits deeper than any spec sheet ever could

---

## the golden circle

why - how - what

(in that order, not the reverse)

we usually go from outside-in

but the ones who inspire - they live inside-out

---

why isn't money

money is a byproduct

"why" is a cause

a soul

a feeling you can't language your way into

your why is what gets you out of bed

when no one's clapping

when it's raining

when you're bleeding

---

## biology, not bullshit

this isn't pop psych

this is wiring

- the "what" lives in our neocortex - logic, reason, language
- the "why" lives in our limbic brain - emotion, behavior, decision-making
    
    (and the limbic brain has no language)
    

that's why you say

"I don't know. it just feels right"

that's your limbic brain talking

it speaks in gut, not grammar

---

## people don't buy what you do

they buy *why* you do it

read that again

like, really read it

---

when people believe what you believe

they show up for themselves

not for you

MLK didn't say

"I have a 7-step policy deck"

he said

"I have a dream"

and 250,000 people showed up in the August sun

no tweets

no flyers

just belief passed from soul to soul

---

## the ones who lead

they don't just have followers

they awaken something buried in the people

they say what the rest of us have been silently feeling

they name the unnamed ache

and suddenly

people are willing to crash 5 times before dinner

just like the Wright brothers

who built a plane with zero degrees, no funding - just belief

---

## the law of diffusion of innovation

- 2.5% - innovators
- 13.5% - early adopters
- 34% - early majority
- 34% - late majority
- 16% - laggards

mass adoption doesn't happen until you tip past 15 to 18 percent

that's the chasm

your job isn't to convince everyone

your job is to find the ones who already believe what you believe

---

## failures aren't about tech or talent

TiVo had all the right parts

money

market

smart people

but they only sold features

meanwhile, Apple made you feel like a rebel with a purpose

and MLK made you feel like justice had a heartbeat

---

## final punch to the gut

"there are leaders, and there are those who lead"

the first have titles

the second move souls

we don't follow the second because we have to

we follow them because we want to

because they remind us of what we already believe

but forgot how to say

---

so now the mirror turns to me

to you

to us

why do you do what you do

no jargon

no bullet points

just heart

because if your why is clear

the rest of us will feel it too

even if we don't have the words`
      }
    ];

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Get a specific post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

// Parse markdown content to HTML (simplified for now)
export async function markdownToHtml(markdown: string): Promise<string> {
  // For now, return the markdown as-is. In production, you'd use a proper markdown parser
  return markdown.replace(/^### /gm, '<h3>').replace(/^## /gm, '<h2>').replace(/^# /gm, '<h1>').replace(/\n/g, '<br>');
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}