import { Icons } from "@/components/icons"
import type { langtype } from "@/types/lang"

export const mr: langtype = {
  leetcode_username: "prathameshchougale17",
  navItems: [
    { title: "मुख्यपृष्ठ", href: "/" },
    { title: "प्रकल्प", href: "/projects" },
    { title: "माझ्याबद्दल", href: "/about" },
    { title: "संपर्क", href: "/contact" },
  ],
  hero: {
    name: "प्रथमेश चौगले",
    image: "/profile.webp",
    title: "सॉफ्टवेअर अभियंता",
    intro: "नमस्ते, मैं ",
    company: "RDM",
    companyLink: "https://rdmtoken.com",
    description:
      "React, Next.js आणि TypeScript मध्ये कुशल फुल-स्टॅक डेव्हलपर। कार्यक्षम, सुलभ आणि स्केलेबल वेब अॅप्लिकेशन्स तयार करण्याची आवड जे वास्तविक जगात प्रभाव टाकतात.",
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
      title: "स्मार्ट इंडिया हॅकाथॉन विजेता",
      description:
        "राष्ट्रीय मूल्यमापनाखाली एक नाविन्यपूर्ण वास्तविक-जागतिक उपाय विकसित करण्यासाठी स्मार्ट इंडिया हॅकाथॉनमध्ये प्रथम क्रमांक मिळवला.",
      Icon: Icons.trophy,
    },
    {
      title: "HSBC हॅकाथॉन विजेता 2024",
      description:
        "आर्थिक वर्कफ्लो आव्हाने सोडवणारे उच्च-प्रभाव वेब-आधारित उपाय विकसित करून HSBC हॅकाथॉन 2024 जिंकले.",
      Icon: Icons.award,
    },
    {
      title: "ओपन सोर्स योगदानकर्ता",
      description:
        "Next.js SaaS Starter (12k+ स्टार्स) सारख्या लोकप्रिय ओपन-सोर्स रिपॉझिटरीमध्ये योगदान दिले, प्रोडक्शन-ग्रेड SaaS विकास साधने वाढवली.",
      Icon: Icons.gitHub,
    },
  ],
  projectsPage: {
    title: "माझे प्रकल्प",
    subtitle: "माझ्या सर्जनशील कार्याचे प्रदर्शन",
    description:
      "React, Next.js आणि AI तंत्रज्ञानाचा वापर करून सर्जनशीलता, अभियांत्रिकी आणि वास्तविक-जागतिक समस्या सोडवणे यांचे संयोजन करणार्‍या माझ्या प्रकल्पांचा शोध घ्या.",
    filters: {
      searchPlaceholder: "शीर्षक, वर्णन किंवा टॅगद्वारे प्रकल्प शोधा...",
      filterByTag: "टॅगद्वारे फिल्टर करा",
      allTags: "सर्व टॅग",
      featuredOnly: "फक्त वैशिष्ट्यीकृत",
      clearFilters: "फिल्टर साफ करा",
    },
  },
  projects: [
    {
      title: "ऊर्जा AI",
      description:
        "व्यक्तिगत मानसिक आणि शारीरिक आरोग्य मूल्यांकन देणारे एक आरोग्य प्लॅटफॉर्म. व्यक्तिगत शिफारसी आणि संवादात्मक शिकण्यासाठी AI वैशिष्ट्ये समाकलित.",
      tags: ["Next.js", "Next Auth", "Shadcn", "MongoDB"],
      liveLink: "https://oorjaai.vercel.app",
      image: "/projects/oorja.webp",
      featured: true,
    },
    {
      title: "स्वाद लिंक",
      description:
        "वास्तविक-वेळ उपलब्धता, शेफ प्रोफाइल्स आणि प्रगत शोध/फिल्टरिंगसह वैयक्तिक शेफ बुकिंगसाठी फुल-स्टॅक वेब अॅप.",
      tags: ["React.js", "Clerk", "Node.js", "Express.js", "MongoDB"],
      githubLink: "https://github.com/Prathamesh-chougale-17/swaadLink",
      liveLink: "https://swaad-link.vercel.app",
      image: "/projects/swaadlink.webp",
      featured: false,
    },
    {
      title: "हेल्थ व्हॉल्ट",
      description:
        "Next.js आणि Clerk वापरून डिजिटल आरोग्य रेकॉर्ड प्लॅटफॉर्म, जे रुग्णांना आरोग्य डेटा कार्यक्षमतेने संग्रहित, पुनर्प्राप्त आणि व्यवस्थापित करण्यास सक्षम करते.",
      tags: ["Next.js", "Sanity", "MongoDB", "Clerk"],
      githubLink: "https://github.com/Prathamesh-chougale-17/health-vault",
      liveLink: "https://health-vault.vercel.app",
      image: "/projects/health-vault.webp",
      featured: false,
    },
    {
      title: "Next.js SaaS स्टार्टर योगदान",
      description:
        "Next.js SaaS Starter (12.3k+ स्टार्स) मध्ये ओपन-सोर्स योगदान — प्रोडक्शन-ग्रेड SaaS उत्पादनांसाठी डेव्हलपर अनुभव सुधारत आहे.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Open Source"],
      githubLink: "https://github.com/nextjs/saas-starter",
      liveLink: "https://next-saas-start.vercel.app",
      image: "/projects/saas.webp",
      featured: true,
    },
    {
      title: "बिगहॉर्न",
      description:
        "जड वाहने आणि यंत्रसामग्रीसाठी आधुनिक भाडे आणि लीजिंग प्लॅटफॉर्म. Next.js, Tailwind CSS आणि MongoDB सह तयार केलेले, हे वास्तविक-वेळ शोध, बुकिंग आणि सुरक्षित पेमेंट देते.",
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      image: "/projects/bighorn.webp",
      liveLink: "https://big-horn.vercel.app",
      featured: false,
    },
    {
      title: "बाउंटी क्वेस्ट",
      description:
        "बाउंटी-क्वेस्ट हे एक विकेंद्रीकृत कार्य-आधारित बक्षीस प्रणाली आहे जे Gemini API वापरून दररोज कार्ये तयार करते. सहभागी ट्विटरद्वारे ब्लॉकचेनवर पोस्ट करून कार्ये पूर्ण करतात, AI-संचालित मूल्यमापनासाठी त्यांच्या ट्विटची लिंक देतात. AI स्कोअरिंगवर आधारित शीर्ष तीन विजेत्यांची घोषणा केली जाते आणि प्रमाणीकरण Solana द्वारे व्यवस्थापित केले जाते. भविष्यातील अपडेट्समध्ये DevSOL मध्ये बक्षिसे वितरीत करण्यासाठी स्मार्ट करार एकत्रीकरण समाविष्ट असेल.",
      tags: ["Solana", "Next.js", "Tailwind CSS", "AI"],
      image: "/projects/bounty-quest.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/bounty-quest",
      liveLink: "https://solana-ai-steel.vercel.app",
      featured: false,
    },
    {
      title: "कार्बन ट्रॅक",
      description:
        "Avalanche ब्लॉकचेनवर ERC-1155 टोकन वापरून कच्च्या मालापासून अंतिम वितरणापर्यंत प्रत्येक उत्पादनाचा मागोवा घ्या. संपूर्ण कार्बन फूटप्रिंट डेटा आणि पुरवठा साखळी सत्यापनासह अपरिवर्तनीय डिजिटल उत्पादन पासपोर्ट तयार करा.",
      tags: ["Next.js", "Tailwind CSS", "Avalanche", "Blockchain"],
      image: "/projects/carbon-track.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/next-carbon-footprint",
      liveLink: "https://next-carbon-footprint.vercel.app",
      featured: true,
    },
    {
      title: "क्लासिक पोर्टफोलिओ टेम्पलेट",
      description:
        "Next.js आणि Tailwind CSS सह तयार केलेले क्लासिक पोर्टफोलिओ वेबसाइट टेम्पलेट, ज्यामध्ये रेस्पॉन्सिव्ह डिझाइन आणि सहज सानुकूलन पर्याय आहेत.",
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
        "Tailwind CSS सह Next.js अॅप्लिकेशन तयार करण्यासाठी सानुकूलन करण्यायोग्य टेम्पलेट.",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript", "Clerk"],
      image: "/projects/custom-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/nextjs-custom-template",
      liveLink: "https://nextjs-custom-template.vercel.app",
      featured: false,
    },
    {
      title: "ई-स्पोर्ट",
      description:
        "स्पर्धात्मक गेमिंग प्लॅटफॉर्म जे स्पर्धा, मॅचमेकिंग आणि खेळाडू आकडेवारी देते. Next.js, Tailwind CSS आणि Firebase सह तयार केलेले.",
      tags: ["Next.js", "Tailwind CSS", "Sanity"],
      image: "/projects/esport.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/esport",
      liveLink: "https://esport-nexus.vercel.app",
      featured: false,
    },
    {
      title: "गेमिफाय",
      description:
        "गेमिफाय हे एक प्लॅटफॉर्म आहे जे वापरकर्त्यांना विविध खेळ आणि आव्हाने तयार करण्यास आणि त्यात सहभागी होण्यास अनुमती देते. Next.js, Tailwind CSS आणि Firebase सह तयार केलेले, यात वास्तविक-वेळ मल्टीप्लेयर समर्थन आणि वापरकर्ता प्रमाणीकरण आहे.",
      tags: ["Next.js", "Tailwind CSS", "Sanity"],
      image: "/projects/gamify.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/gamify",
      liveLink: "https://gamify-swart.vercel.app/",
      featured: false,
    },
    {
      title: "गो ऑथ",
      description:
        "हे रिपॉझिटरी एक स्टार्टर प्रोजेक्ट आहे जे Go (Golang) बॅकएंड आणि Tanstack फ्रंटएंड वापरून सुरक्षित, स्केलेबल प्रमाणीकरण प्रणाली प्रदर्शित करते. यात वापरकर्ता नोंदणी, लॉगिन, पासवर्ड हॅशिंग, JWT-आधारित सत्र व्यवस्थापन आणि संरक्षित मार्ग यांसारखी वैशिष्ट्ये समाविष्ट आहेत.",
      tags: ["Go", "Tanstack", "Authentication"],
      image: "/projects/go-auth.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/go-auth",
      featured: false,
    },
    {
      title: "होमब्रू",
      description:
        "संगणक दृष्टी आणि IoT सेन्सर वापरून प्रगत AI शोध आणि पर्यावरण निरीक्षण प्रणाली. Next.js, Tailwind CSS सह तयार केलेले आणि वास्तविक-वेळ विश्लेषणासाठी AI मॉडेल्ससह समाकलित. ऑब्जेक्ट डिटेक्शनसाठी Yolov12 आणि विशिष्ट वापर प्रकरणांसाठी सानुकूल-प्रशिक्षित मॉडेल वापरले.",
      tags: ["Next.js", "Tailwind CSS", "AI", "IoT", "Yolov12"],
      image: "/projects/homebrew.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/ideathon-web",
      liveLink: "https://homebrew-nine.vercel.app",
      featured: false,
    },
    {
      title: "HSBC",
      description:
        "हे एक सर्वसमावेशक डॅशबोर्ड आहे जे विविध डेटा व्हिज्युअलायझेशन तंत्रे वापरून आर्थिक फसवणूक शोधणे याबद्दल अंतर्दृष्टी प्रदान करते. डॅशबोर्ड Nextjs, TypeScript, Tailwind CSS आणि Recharts वापरून तयार केले आहे.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      image: "/projects/hsbc.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/hsbc",
      liveLink: "https://hsbc-five.vercel.app",
      featured: false,
    },
    {
      title: "लिंक शॉर्टर",
      description:
        "Go बॅकएंड आणि React फ्रंटएंडसह तयार केलेले आधुनिक, फुल-स्टॅक URL शॉर्टनर अॅप्लिकेशन. यात वास्तविक-वेळ क्लिक विश्लेषणे देखील आहेत.",
      tags: ["Go", "React", "Tailwind CSS", "MongoDB"],
      image: "/projects/link-shorter.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/link-shorter",
      featured: false,
    },
    {
      title: "मिररशिप",
      description:
        "मिररशिप दैनंदिन जर्नलिंगला AI-संचालित अंतर्दृष्टी आणि क्रियाकलाप ट्रॅकिंगसह एकत्र करते. लिहा, प्रतिबिंबित करा आणि तुमच्या वैयक्तिक विकास प्रवासातील नमुने शोधा.",
      tags: ["Next.js", "Tailwind CSS", "AI"],
      image: "/projects/mirrorship.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/mirrorship",
      liveLink: "https://mirrorship.vercel.app",
      featured: false,
    },
    {
      title: "आधुनिक पोर्टफोलिओ टेम्पलेट",
      description:
        "Next.js आणि Tailwind CSS सह तयार केलेले आकर्षक आणि आधुनिक पोर्टफोलिओ वेबसाइट टेम्पलेट, तुमचे प्रकल्प आणि कौशल्ये प्रभावीपणे प्रदर्शित करण्यासाठी डिझाइन केलेले.",
      tags: ["Next.js", "Tailwind CSS", "Shadcn", "TypeScript"],
      image: "/projects/modern-portfolio-template.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/next-modern-portfolio-template",
      liveLink: "https://next-modern-portfolio-template.vercel.app",
      featured: false,
    },
    {
      title: "म्युझिफाय",
      description:
        "म्युझिफाय हे संगीत स्ट्रीमिंग वेब अॅप्लिकेशन आहे जे वापरकर्त्यांना त्यांची आवडती गाणी ब्राउझ करण्यास, शोधण्यास आणि प्ले करण्यास अनुमती देते. फ्रंटएंडसाठी Next.js आणि डेटाबेससाठी MongoDB सह तयार केलेले, यात आकर्षक UI आणि अखंड प्लेबॅक अनुभव आहे.",
      tags: ["Next.js", "Tailwind CSS", "Sanity", "MongoDB"],
      image: "/projects/muxify.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/muxicify",
      liveLink: "https://muxify.vercel.app",
      featured: false,
    },
    {
      title: "नेक्स्ट अल्गोरँड स्टार्टर",
      description:
        "Next.js वापरून अल्गोरँड अॅप्लिकेशन तयार करण्यासाठी स्टार्टर टेम्पलेट.",
      tags: ["Next.js", "Algorand"],
      image: "/projects/next-algorand-starter.webp",
      githubLink:
        "https://github.com/Prathamesh-chougale-17/algorand-nextjs-starter",
      featured: false,
    },
    {
      title: "पार्कपूलएक्स",
      description:
        "पार्किंग ऑप्टिमाइझ करा, गर्दी कमी करा आणि आमच्या एकात्मिक प्लॅटफॉर्मसह सहज राइड शोधा. पार्कपूलएक्स शहरी गतिशीलता आणि पार्किंग कार्यक्षमता वाढविण्यासाठी वास्तविक-वेळ डेटा आणि वापरकर्ता-अनुकूल डिझाइनचा लाभ घेते.",
      tags: ["Next.js", "Tailwind CSS", "MongoDB", "Next Auth"],
      image: "/projects/parkpoolx.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/parkpoolx",
      liveLink: "https://parkpoolx.vercel.app",
      featured: false,
    },
    {
      title: "स्पेस थीम टेम्पलेट",
      description:
        "Next.js आणि Tailwind CSS सह तयार केलेले भविष्यवादी स्पेस-थीम असलेले वेबसाइट टेम्पलेट, तुमचे प्रकल्प अद्वितीय पद्धतीने प्रदर्शित करण्यासाठी परिपूर्ण.",
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
        "स्टडी स्टेटस हे वेब अॅप्लिकेशन आहे जे विद्यार्थ्यांना त्यांच्या अभ्यासाची प्रगती ट्रॅक करण्यात आणि त्यांचा वेळ प्रभावीपणे व्यवस्थापित करण्यात मदत करते. Next.js आणि Tailwind CSS सह तयार केलेले, यात स्वच्छ आणि सहज इंटरफेस आहे.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/projects/study-status.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/status-study",
      liveLink: "https://status-study-seven.vercel.app",
      featured: false,
    },
    {
      title: "टँकशूटर",
      description:
        "टँकशूटर हा Next.js आणि Socket.io सह तयार केलेला रोमांचक मल्टीप्लेयर टँक युद्ध खेळ आहे. खेळाडू युद्धात सामील होऊ शकतात, त्यांच्या टँकला सानुकूलित करू शकतात आणि लीडरबोर्डवर शीर्ष स्थानासाठी स्पर्धा करू शकतात.",
      tags: ["Next.js", "Socket.io", "Game Development"],
      image: "/projects/tankshooter.webp",
      githubLink: "https://github.com/Prathamesh-chougale-17/tankshooter",
      liveLink: "https://tankshooter-seven.vercel.app",
      featured: false,
    },
    {
      title: "ट्यूलिपपीजी",
      description:
        "हे सोपे PG/हॉस्टेल व्यवस्थापन वेब अॅप्लिकेशन आहे जे वापरकर्त्यांना त्यांच्या प्राधान्यांनुसार PG आणि हॉस्टेल सहजपणे शोधण्यास अनुमती देते. Next.js, Tailwind CSS आणि MongoDB सह तयार केलेले, हे अखंड वापरकर्ता अनुभवासाठी प्रगत शोध आणि फिल्टरिंग पर्याय देते.",
      tags: ["Next.js", "Tailwind CSS", "TypeScript"],
      image: "/projects/tulippg.webp",
      liveLink: "https://tulippg.in",
      featured: true,
    },
  ],
  about: {
    hero: {
      title: "माझ्याबद्दल",
      image: "/profile.webp",
      subtitle: "फुल स्टॅक डेव्हलपर | ओपन सोर्स योगदानकर्ता | समस्या सोडवणारा",
      description:
        "मी संगणक विज्ञानाचा मजबूत पाया आणि स्केलेबल वेब अॅप्लिकेशन तयार करण्याचा व्यावहारिक अनुभव असलेला उत्साही फुल-स्टॅक डेव्हलपर आहे. माझ्या प्रवासात HSBC साठी एंटरप्राइझ डॅशबोर्ड विकसित करणे, हॅकाथॉन टीमचे नेतृत्व करणे आणि ओपन सोर्स प्रकल्पांमध्ये योगदान देणे समाविष्ट आहे.",
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
        title: "सॉफ्टवेअर प्रशिक्षणार्थी इंटर्न",
        company: "HSBC",
        period: "जानेवारी 2025 - मार्च 2025",
        description:
          "टीम अपडेट्स आणि संस्थात्मक डेटा एकत्रित डॅशबोर्डमध्ये एकत्र करण्यासाठी फुल-स्टॅक अंतर्गत वेब अॅप्लिकेशन विकसित केले. React.js आणि Java वापरून अंतर्गत दृश्यमानता आणि सहकार्य सुधारले.",
      },
      {
        title: "फ्रीलान्स फुल स्टॅक डेव्हलपर",
        company: "स्व-नियोजित",
        period: "सप्टेंबर 2024 - डिसेंबर 2024",
        description:
          "React.js, Next.js आणि TypeScript वापरून ग्राहकांसाठी गतिशील वेब अॅप्लिकेशन तयार आणि राखले. ओपन-सोर्स रिपॉझिटरीमध्ये स्वच्छ, पुन्हा वापरण्यायोग्य आणि स्केलेबल कोडचे योगदान दिले.",
      },
      {
        title: "समुदाय योगदानकर्ता",
        company: "ACM चॅप्टर, PCCOE",
        period: "2024",
        description:
          "Git, GitHub आणि ओपन सोर्सवर 300+ विद्यार्थ्यांसाठी सत्रे आयोजित केली. मजबूत डेव्हलपर समुदाय स्थापित करण्यात आणि सार्वजनिक प्रकल्पांमध्ये योगदान वाढविण्यात मदत केली.",
      },
    ],
    stats: {
      statItems: [
        { label: "LeetCode समस्या सोडवल्या", value: "250+" },
        { label: "हॅकाथॉन विजय", value: "5+" },
      ],
      leetcodeRating: "1500+",
    },
  },
  contact: {
    thoughtTitle: "चला काहीतरी प्रभावशाली तयार करूया",
    thoughtText:
      "मला नाविन्यपूर्ण कल्पनांवर सहकार्य करण्याची आवड आहे ज्या सीमा ढकलतात. तुम्ही काहीतरी रोमांचक काम करत असाल किंवा तुमची दृष्टी जिवंत करण्यासाठी डेव्हलपरची आवश्यकता असेल, तर चला जोडूया!",
    imageUrl: "/contact/dialing.gif",
    imageAlt: "लॅपटॉपवर काम करणारा डेव्हलपर",
    socials: {
      title: "माझ्याशी जुळा",
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
      title: "मला संदेश पाठवा",
      name: { label: "नाव", placeholder: "तुमचे नाव" },
      email: { label: "ईमेल", placeholder: "your.email@example.com" },
      subject: { label: "विषय", placeholder: "संदेश विषय प्रविष्ट करा" },
      message: {
        label: "संदेश",
        placeholder: "तुमच्या प्रकल्पाबद्दल किंवा चौकशीबद्दल मला सांगा...",
      },
      submit: "संदेश पाठवा",
      success: "संपर्क साधल्याबद्दल धन्यवाद! मी लवकरच तुमच्याशी संपर्क करेन.",
      error: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
    },
  },
  offline: {
    title: "तुम्ही ऑफलाइन आहात",
    description:
      "असे दिसते की तुम्ही तुमचे इंटरनेट कनेक्शन गमावले आहे. तुम्ही परत ऑनलाइन येईपर्यंत काही वैशिष्ट्ये उपलब्ध नसू शकतात.",
    returnToHome: "मुख्यपृष्ठावर परत या",
    tryAgain: "पुन्हा प्रयत्न करा",
  },
  chat: {
    typing: "टाइप करत आहे...",
    online: "ऑनलाइन",
    clear: "साफ करा",
    close: "बंद करा",
    messagePlaceholder: "तुमचा संदेश टाइप करा...",
    chatLoading: "अह्ह, मला विचार करू द्या...",
    copy: "कॉपी करा",
    copied: "कॉपी केले",
    chatCleared: "चॅट साफ केले",
    failedToSend: "संदेश पाठवण्यात अयशस्वी",
    errorResponse:
      "मला आत्ता प्रतिसाद देण्यात अडचण येत आहे. नंतर पुन्हा प्रयत्न करा.",
    welcomeMessage:
      "नमस्ते! मी प्रथमेश चौगले आहे, एक सॉफ्टवेअर अभियंता जो प्रभावशाली वेब अॅप्लिकेशन्स तयार करण्यासाठी उत्साही आहे. आज मी तुम्हाला कशी मदत करू शकतो?",
  },
}
