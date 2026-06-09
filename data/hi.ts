import { Icons } from "@/components/icons"
import type { langtype } from "@/types/lang"

export const hi: langtype = {
  leetcode_username: "prathameshchougale17",
  navItems: [
    { title: "होम", href: "/" },
    { title: "प्रोजेक्ट्स", href: "/projects" },
    { title: "मेरे बारे में", href: "/about" },
    { title: "संपर्क करें", href: "/contact" },
  ],
  hero: {
    name: "प्रथमेश चौगले",
    image: "/profile.webp",
    title: "सॉफ्टवेयर इंजीनियर",
    intro: "नमस्ते, मैं ",
    company: "RDM",
    companyLink: "https://rdmtoken.com",
    description:
      "React, Next.js और TypeScript में कुशल फुल-स्टैक डेवलपर। प्रदर्शनशील, सुलभ और स्केलेबल वेब एप्लिकेशन बनाने का जुनून जो वास्तविक दुनिया में प्रभाव डालते हैं।",
  },
  homeSection: {
    achievementSectionTitle: "उपलब्धियाँ",
    projectSectionTitle: "प्रोजेक्ट्स",
  },
  aboutSection: {
    statsTitle: "आंकड़े",
    techStackTitle: "तकनीकी स्टैक",
    experienceTitle: "अनुभव",
  },
  achievements: [
    {
      title: "स्मार्ट इंडिया हैकथॉन विजेता",
      description:
        "राष्ट्रीय मूल्यांकन के तहत एक नवीन वास्तविक-दुनिया समाधान विकसित करने के लिए स्मार्ट इंडिया हैकथॉन में रैंक 1 प्राप्त की।",
      Icon: Icons.trophy,
    },
    {
      title: "HSBC हैकथॉन विजेता 2024",
      description:
        "वित्तीय वर्कफ़्लो चुनौतियों को संबोधित करने वाले उच्च-प्रभाव वेब-आधारित समाधान विकसित करके HSBC हैकथॉन 2024 जीता।",
      Icon: Icons.award,
    },
    {
      title: "ओपन सोर्स योगदानकर्ता",
      description:
        "Next.js SaaS Starter (12k+ स्टार) जैसे लोकप्रिय ओपन-सोर्स रिपॉजिटरी में योगदान दिया, जो उत्पादन-ग्रेड SaaS विकास उपकरणों को बढ़ाता है।",
      Icon: Icons.gitHub,
    },
  ],
  projectsPage: {
    title: "मेरे प्रोजेक्ट्स",
    subtitle: "मेरे रचनात्मक कार्य का प्रदर्शन",
    description:
      "React, Next.js और AI तकनीकों का उपयोग करके रचनात्मकता, इंजीनियरिंग और वास्तविक-दुनिया की समस्या समाधान को संयोजित करने वाले मेरे प्रोजेक्ट्स का अन्वेषण करें।",
    filters: {
      searchPlaceholder: "शीर्षक, विवरण या टैग द्वारा प्रोजेक्ट खोजें...",
      filterByTag: "टैग द्वारा फ़िल्टर करें",
      allTags: "सभी टैग",
      featuredOnly: "केवल विशेष रुप से प्रदर्शित",
      clearFilters: "फ़िल्टर साफ़ करें",
    },
  },
  projects: [
    {
      title: "ऊर्जा AI",
      description:
        "व्यक्तिगत मानसिक और शारीरिक स्वास्थ्य मूल्यांकन प्रदान करने वाला एक कल्याण मंच। व्यक्तिगत सिफारिशों और इंटरैक्टिव सीखने के लिए AI सुविधाएं एकीकृत।",
      tags: ["Next.js", "Next Auth", "Shadcn", "MongoDB"],
      liveLink: "https://oorjaai.vercel.app",
      image: "/projects/oorja.webp",
      featured: true,
    },
    {
      title: "स्वाद लिंक",
      description:
        "वास्तविक समय उपलब्धता, शेफ प्रोफाइल और उन्नत खोज/फ़िल्टरिंग के साथ व्यक्तिगत शेफ बुक करने के लिए फुल-स्टैक वेब ऐप।",
      tags: ["React.js", "Clerk", "Node.js", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Prathamesh-chougale-17/swaadLink",
      liveLink: "https://swaad-link.vercel.app",
      image: "/projects/swaadlink.webp",
      featured: false,
    },
    {
      title: "हेल्थ वॉल्ट",
      description:
        "Next.js और Clerk का उपयोग करके डिजिटल स्वास्थ्य रिकॉर्ड प्लेटफॉर्म, जो रोगियों को स्वास्थ्य डेटा को कुशलता से संग्रहीत, पुनर्प्राप्त और प्रबंधित करने में सक्षम बनाता है।",
      tags: ["Next.js", "Sanity", "MongoDB", "Clerk"],
      githubLink: "https://github.com/Prathamesh-chougale-17/health-vault",
      liveLink: "https://health-vault.vercel.app",
      image: "/projects/health-vault.webp",
      featured: false,
    },
    {
      title: "Next.js SaaS स्टार्टर योगदान",
      description:
        "Next.js SaaS Starter (12.3k+ स्टार) में ओपन-सोर्स योगदान - उत्पादन-ग्रेड SaaS उत्पादों के लिए डेवलपर अनुभव में सुधार।",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Open Source"],
      githubLink: "https://github.com/nextjs/saas-starter",
      liveLink: "https://next-saas-start.vercel.app",
      image: "/projects/saas.webp",
      featured: true,
    },
    {
      title: "बिगहॉर्न",
      description:
        "भारी वाहनों और मशीनरी के लिए एक आधुनिक किराए और पट्टे का मंच। Next.js, Tailwind CSS और MongoDB के साथ बनाया गया, यह वास्तविक समय खोज, बुकिंग और सुरक्षित भुगतान प्रदान करता है।",
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      image: "/projects/bighorn.webp",
      liveLink: "https://big-horn.vercel.app",
      featured: false,
    },
    {
      title: "बाउंटी क्वेस्ट",
      description:
        "Bounty-Quest एक विकेंद्रीकृत कार्य-आधारित पुरस्कार प्रणाली है जो Gemini API का उपयोग करके दैनिक कार्य उत्पन्न करती है। प्रतिभागी Twitter के माध्यम से ब्लॉकचेन पर पोस्ट करके कार्य पूरा करते हैं, AI-संचालित मूल्यांकन के लिए अपने ट्वीट का लिंक प्रदान करते हैं। शीर्ष तीन विजेताओं को AI स्कोरिंग के आधार पर घोषित किया जाता है, और प्रमाणीकरण Solana के माध्यम से प्रबंधित किया जाता है।",
      tags: ["Solana", "Next.js", "Tailwind CSS", "AI"],
      image: "/projects/bounty-quest.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/bounty-quest",
      liveLink: "https://solana-ai-steel.vercel.app",
      featured: false,
    },
    {
      title: "कार्बन ट्रैक",
      description:
        "Avalanche ब्लॉकचेन पर ERC-1155 टोकन का उपयोग करके कच्चे माल से अंतिम डिलीवरी तक प्रत्येक उत्पाद को ट्रैक करें। पूर्ण कार्बन फुटप्रिंट डेटा और आपूर्ति श्रृंखला सत्यापन के साथ अपरिवर्तनीय डिजिटल उत्पाद पासपोर्ट उत्पन्न करें।",
      tags: ["Next.js", "Tailwind CSS", "Avalanche", "Blockchain"],
      image: "/projects/carbon-track.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/next-carbon-footprint",
      liveLink: "https://next-carbon-footprint.vercel.app",
      featured: true,
    },
    {
      title: "क्लासिक पोर्टफोलियो टेम्पलेट",
      description:
        "Next.js और Tailwind CSS के साथ निर्मित एक क्लासिक पोर्टफोलियो वेबसाइट टेम्पलेट, जिसमें उत्तरदायी डिज़ाइन और आसान अनुकूलन विकल्प हैं।",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript", "Clerk"],
      image: "/projects/classic-portfolio-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/classic-portfolio-template",
      liveLink: "https://classic-portfolio-template-green.vercel.app",
      featured: false,
    },
    {
      title: "कस्टम टेम्पलेट",
      description:
        "Tailwind CSS के साथ Next.js एप्लिकेशन बनाने के लिए एक अनुकूलन योग्य टेम्पलेट।",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript", "Clerk"],
      image: "/projects/custom-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/nextjs-custom-template",
      liveLink: "https://nextjs-custom-template.vercel.app",
      featured: false,
    },
    {
      title: "ईस्पोर्ट",
      description:
        "एक प्रतिस्पर्धी गेमिंग प्लेटफॉर्म जो टूर्नामेंट, मैचमेकिंग और खिलाड़ी आँकड़े प्रदान करता है। Next.js, Tailwind CSS और Firebase के साथ बनाया गया।",
      tags: ["Next.js", "Tailwind CSS", "Sanity"],
      image: "/projects/esport.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/esport",
      liveLink: "https://esport-nexus.vercel.app",
      featured: false,
    },
    {
      title: "गेमिफाई",
      description:
        "Gamify एक मंच है जो उपयोगकर्ताओं को विभिन्न खेल और चुनौतियाँ बनाने और भाग लेने की अनुमति देता है। Next.js, Tailwind CSS और Firebase के साथ निर्मित, यह वास्तविक समय मल्टीप्लेयर समर्थन और उपयोगकर्ता प्रमाणीकरण प्रदान करता है।",
      tags: ["Next.js", "Tailwind CSS", "Sanity"],
      image: "/projects/gamify.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/gamify",
      liveLink: "https://gamify-swart.vercel.app/",
      featured: false,
    },
    {
      title: "गो ऑथ",
      description:
        "यह रिपॉजिटरी एक स्टार्टर प्रोजेक्ट है जो बैकएंड के लिए Go (Golang) और फ्रंटएंड के लिए Tanstack का उपयोग करके एक सुरक्षित, स्केलेबल प्रमाणीकरण प्रणाली प्रदर्शित करता है। इसमें उपयोगकर्ता पंजीकरण, लॉगिन, पासवर्ड हैशिंग, JWT-आधारित सत्र प्रबंधन और संरक्षित मार्ग जैसी सुविधाएं शामिल हैं।",
      tags: ["Go", "Tanstack", "Authentication"],
      image: "/projects/go-auth.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/go-auth",
      featured: false,
    },
    {
      title: "होमब्रू",
      description:
        "कंप्यूटर विज़न और IoT सेंसर का उपयोग करके उन्नत AI पहचान और पर्यावरणीय निगरानी प्रणाली। वास्तविक समय विश्लेषण के लिए AI मॉडल के साथ एकीकृत Next.js, Tailwind CSS के साथ निर्मित। ऑब्जेक्ट डिटेक्शन के लिए Yolov12 और विशिष्ट उपयोग के मामलों के लिए कस्टम-प्रशिक्षित मॉडल का उपयोग किया।",
      tags: ["Next.js", "Tailwind CSS", "AI", "IoT", "Yolov12"],
      image: "/projects/homebrew.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/ideathon-web",
      liveLink: "https://homebrew-nine.vercel.app",
      featured: false,
    },
    {
      title: "HSBC",
      description:
        "यह एक व्यापक डैशबोर्ड है जो विभिन्न डेटा विज़ुअलाइज़ेशन तकनीकों का उपयोग करके वित्तीय धोखाधड़ी का पता लगाने में अंतर्दृष्टि प्रदान करता है। डैशबोर्ड Nextjs, TypeScript, Tailwind CSS और Recharts का उपयोग करके बनाया गया है।",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      image: "/projects/hsbc.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/hsbc",
      liveLink: "https://hsbc-five.vercel.app",
      featured: false,
    },
    {
      title: "लिंक शॉर्टर",
      description:
        "Go बैकएंड और React फ्रंटएंड के साथ निर्मित एक आधुनिक, फुल-स्टैक URL शॉर्टनर एप्लिकेशन। इसमें वास्तविक समय क्लिक एनालिटिक्स भी है।",
      tags: ["Go", "React", "Tailwind CSS", "MongoDB"],
      image: "/projects/link-shorter.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/link-shorter",
      featured: false,
    },
    {
      title: "मिररशिप",
      description:
        "Mirrorship दैनिक जर्नलिंग को AI-संचालित अंतर्दृष्टि और गतिविधि ट्रैकिंग के साथ जोड़ता है। लिखें, चिंतन करें और अपनी व्यक्तिगत विकास यात्रा में पैटर्न खोजें।",
      tags: ["Next.js", "Tailwind CSS", "AI"],
      image: "/projects/mirrorship.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/mirrorship",
      liveLink: "https://mirrorship.vercel.app",
      featured: false,
    },
    {
      title: "मॉडर्न पोर्टफोलियो टेम्पलेट",
      description:
        "Next.js और Tailwind CSS के साथ निर्मित एक चिकना और आधुनिक पोर्टफोलियो वेबसाइट टेम्पलेट, जो आपके प्रोजेक्ट्स और कौशल को प्रभावी ढंग से प्रदर्शित करने के लिए डिज़ाइन किया गया है।",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript"],
      image: "/projects/modern-portfolio-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/next-modern-portfolio-template",
      liveLink: "https://next-modern-portfolio-template.vercel.app",
      featured: false,
    },
    {
      title: "मक्सिफाई",
      description:
        "Muxify एक संगीत स्ट्रीमिंग वेब एप्लिकेशन है जो उपयोगकर्ताओं को अपने पसंदीदा गाने ब्राउज़ करने, खोजने और प्ले करने की अनुमति देता है। फ्रंटएंड के लिए Next.js और डेटाबेस के लिए MongoDB के साथ निर्मित, इसमें एक चिकना UI और सहज प्लेबैक अनुभव है।",
      tags: ["Next.js", "Tailwind CSS", "Sanity", "MongoDB"],
      image: "/projects/muxify.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/muxicify",
      liveLink: "https://muxify.vercel.app",
      featured: false,
    },
    {
      title: "नेक्स्ट अल्गोरैंड स्टार्टर",
      description:
        "Next.js का उपयोग करके Algorand एप्लिकेशन बनाने के लिए एक स्टार्टर टेम्पलेट।",
      tags: ["Next.js", "Algorand"],
      image: "/projects/next-algorand-starter.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/algorand-nextjs-starter",
      featured: false,
    },
    {
      title: "पार्कपूलएक्स",
      description:
        "हमारे एकीकृत मंच के साथ पार्किंग को अनुकूलित करें, भीड़भाड़ कम करें और आसानी से सवारी खोजें। Parkpoolx शहरी गतिशीलता और पार्किंग दक्षता को बढ़ाने के लिए वास्तविक समय डेटा और उपयोगकर्ता-अनुकूल डिज़ाइन का लाभ उठाता है।",
      tags: ["Next.js", "Tailwind CSS", "MongoDB", "Next Auth"],
      image: "/projects/parkpoolx.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/parkpoolx",
      liveLink: "https://parkpoolx.vercel.app",
      featured: false,
    },
    {
      title: "स्पेस थीम टेम्पलेट",
      description:
        "Next.js और Tailwind CSS के साथ निर्मित एक भविष्यवादी स्पेस-थीम्ड वेबसाइट टेम्पलेट, जो आपके प्रोजेक्ट्स को एक अनूठे तरीके से प्रदर्शित करने के लिए बिल्कुल सही है।",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript"],
      image: "/projects/space-theme-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/space-theme-template",
      liveLink: "https://space-theme-template.vercel.app",
      featured: false,
    },
    {
      title: "स्टडी स्टेटस",
      description:
        "Study Status एक वेब एप्लिकेशन है जो छात्रों को अपनी अध्ययन प्रगति को ट्रैक करने और अपने समय को प्रभावी ढंग से प्रबंधित करने में मदद करता है। Next.js और Tailwind CSS के साथ निर्मित, इसमें एक साफ और सहज इंटरफ़ेस है।",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/projects/study-status.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/status-study",
      liveLink: "https://status-study-seven.vercel.app",
      featured: false,
    },
    {
      title: "टैंकशूटर",
      description:
        "Tankshooter Next.js और Socket.io के साथ निर्मित एक रोमांचक मल्टीप्लेयर टैंक बैटल गेम है। खिलाड़ी युद्धों में शामिल हो सकते हैं, अपने टैंक को अनुकूलित कर सकते हैं और लीडरबोर्ड पर शीर्ष स्थान के लिए प्रतिस्पर्धा कर सकते हैं।",
      tags: ["Next.js", "Socket.io", "Game Development"],
      image: "/projects/tankshooter.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/tankshooter",
      liveLink: "https://tankshooter-seven.vercel.app",
      featured: false,
    },
    {
      title: "ट्यूलिपपीजी",
      description:
        "यह एक सरल PG/होस्टल प्रबंधन वेब एप्लिकेशन है जो उपयोगकर्ताओं को उनकी प्राथमिकताओं के आधार पर आसानी से PG और होस्टल खोजने की अनुमति देता है। Next.js, Tailwind CSS और MongoDB के साथ निर्मित, यह एक सहज उपयोगकर्ता अनुभव के लिए उन्नत खोज और फ़िल्टरिंग विकल्प प्रदान करता है।",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/projects/tulippg.webp",
      liveLink: "https://tulippg.in",
      featured: true,
    },
  ],
  about: {
    hero: {
      title: "मेरे बारे में",
      image: "/profile.webp",
      subtitle: "फुल स्टैक डेवलपर | ओपन सोर्स योगदानकर्ता | समस्या समाधानकर्ता",
      description:
        "मैं कंप्यूटर विज्ञान में मजबूत नींव और स्केलेबल वेब एप्लिकेशन बनाने के व्यावहारिक अनुभव के साथ एक भावुक फुल-स्टैक डेवलपर हूं। मेरी यात्रा में HSBC के लिए एंटरप्राइज़ डैशबोर्ड विकसित करना, हैकथॉन टीमों का नेतृत्व करना और ओपन सोर्स प्रोजेक्ट्स में योगदान शामिल है।",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    },
    techSkills: [
      { name: "React", level: 5, icon: Icons.react },
      { name: "TypeScript", level: 5, icon: Icons.typescript },
      { name: "Next.js", level: 5, icon: Icons.nextjs },
      { name: "Node.js", level: 4, icon: Icons.nodejs },
      { name: "Tailwind CSS", level: 5, icon: Icons.tailwindcss },
      { name: "Python", level: 3, icon: Icons.python },
      { name: "Docker", level: 3, icon: Icons.docker },
      { name: "Git/GitHub", level: 5, icon: Icons.gitHub },
      { name: "Databases", level: 4, icon: Icons.database },
      { name: "Arch Linux", level: 3, icon: Icons.arch },
    ],
    experiences: [
      {
        title: "सॉफ्टवेयर प्रशिक्षु इंटर्न",
        company: "HSBC",
        period: "जनवरी 2025 - मार्च 2025",
        description:
          "टीम अपडेट और संगठनात्मक डेटा को एकीकृत डैशबोर्ड में समेकित करने के लिए एक फुल-स्टैक आंतरिक वेब एप्लिकेशन विकसित किया। React.js और Java का उपयोग करके आंतरिक दृश्यता और सहयोग में सुधार किया।",
      },
      {
        title: "फ्रीलांस फुल स्टैक डेवलपर",
        company: "स्व-नियोजित",
        period: "सितंबर 2024 - दिसंबर 2024",
        description:
          "React.js, Next.js और TypeScript का उपयोग करके ग्राहकों के लिए गतिशील वेब एप्लिकेशन बनाए और बनाए रखे। ओपन-सोर्स रिपॉजिटरी में स्वच्छ, पुन: प्रयोज्य और स्केलेबल कोड योगदान दिया।",
      },
      {
        title: "समुदाय योगदानकर्ता",
        company: "ACM Chapter, PCCOE",
        period: "2024",
        description:
          "Git, GitHub और Open Source पर 300+ छात्रों के लिए सत्र आयोजित किए। एक मजबूत डेवलपर समुदाय स्थापित करने और सार्वजनिक प्रोजेक्ट्स में योगदान को बढ़ावा देने में मदद की।",
      },
    ],
    stats: {
      statItems: [
        { label: "LeetCode समस्याएं हल की", value: "450+" },
        { label: "हैकथॉन जीत", value: "5+" },
      ],
      leetcodeRating: "1500+",
    },
  },
  contact: {
    thoughtTitle: "आइए कुछ प्रभावशाली बनाएं",
    thoughtText:
      "मुझे नवीन विचारों पर सहयोग करना पसंद है जो सीमाओं को धक्का देते हैं। यदि आप कुछ रोमांचक पर काम कर रहे हैं या अपनी दृष्टि को जीवन में लाने के लिए एक डेवलपर की आवश्यकता है, तो आइए जुड़ें!",
    imageUrl: "/contact/dialing.gif",
    imageAlt: "लैपटॉप पर काम करने वाला डेवलपर",
    socials: {
      title: "मुझसे जुड़ें",
      links: [
        {
          name: Icons.instagram,
          url: "https://instagram.com/prathamesh_chougale_17",
          label: "Instagram",
        },
        {
          name: Icons.x,
          url: "https://twitter.com/prathamesh_7717",
          label: "X (Twitter)",
        },
        {
          name: Icons.linkedin,
          url: "https://linkedin.com/in/prathamesh-chougale",
          label: "LinkedIn",
        },
        {
          name: Icons.gitHub,
          url: "https://github.com/prathamesh-chougale-17",
          label: "GitHub",
        },
      ],
    },
    form: {
      title: "मुझे एक संदेश भेजें",
      name: { label: "नाम", placeholder: "आपका नाम" },
      email: { label: "ईमेल", placeholder: "your.email@example.com" },
      subject: { label: "विषय", placeholder: "संदेश विषय दर्ज करें" },
      message: {
        label: "संदेश",
        placeholder: "मुझे अपने प्रोजेक्ट या पूछताछ के बारे में बताएं...",
      },
      submit: "संदेश भेजें",
      success: "संपर्क करने के लिए धन्यवाद! मैं जल्द ही आपसे संपर्क करूंगा।",
      error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    },
  },
  offline: {
    title: "आप ऑफलाइन हैं",
    description:
      "ऐसा लगता है कि आपने अपना इंटरनेट कनेक्शन खो दिया है। जब तक आप वापस ऑनलाइन नहीं हो जाते, तब तक कुछ सुविधाएं उपलब्ध नहीं हो सकती हैं।",
    returnToHome: "होम पर लौटें",
    tryAgain: "पुनः प्रयास करें",
  },
  chat: {
    typing: "टाइप कर रहे हैं...",
    online: "ऑनलाइन",
    clear: "साफ़ करें",
    close: "बंद करें",
    messagePlaceholder: "अपना संदेश टाइप करें...",
    chatLoading: "अह्ह, मुझे सोचने दो...",
    copy: "कॉपी करें",
    copied: "कॉपी किया गया",
    chatCleared: "चैट साफ़ की गई",
    failedToSend: "संदेश भेजने में विफल",
    errorResponse:
      "मुझे अभी जवाब देने में समस्या हो रही है। बाद में पुनः प्रयास करें।",
    welcomeMessage:
      "नमस्ते! मैं प्रथमेश चौगले हूँ, एक सॉफ्टवेयर इंजीनियर जो प्रभावशाली वेब एप्लिकेशन बनाने के लिए उत्साहित है। मैं आज आपकी कैसे मदद कर सकता हूँ?",
  },
}
