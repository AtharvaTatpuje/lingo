import Head from 'next/head';
import Image from "next/image";

const founders = [
  { name: 'Atharva Tatpuje', position: 'Full Stack Devloper', bio: 'Sies Graduate School of Technology', image: '/founder1.jpg', linkedin: 'https://www.linkedin.com/in/atharva-tatpuje-20007a220/',instagram:'https://www.instagram.com/atharva_tatpuje/'  },
  { name: 'Raj Pawar', position: 'ML Engineer', bio: 'Sies Graduate School of Technology', image: '/founder2.jpg', linkedin: 'https://www.linkedin.com/in/raj-pawar-14629324a/',instagram:'https://www.instagram.com/rajpawar9971/'  },
  { name: 'Saiban Pagarkar', position: 'ML Engineer', bio: 'Sies Graduate School of Technology', image: '/founder3.jpg', linkedin: 'https://www.linkedin.com/in/saiban-pagarkar-3b2b6924b/',instagram:'https://www.instagram.com/saiban_000/'  },
  { name: 'Ganesh Pujari', position: 'Full Stack Devloper', bio: 'Sies Graduate School of Technology', image: '/founder4.jpg', linkedin: 'https://www.linkedin.com/in/ganesh-pujari-2b1a0521a/',instagram:'https://www.instagram.com/_ganesh_2886/' },
];

const About = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Head>
        <title>Company Name - About Us</title>
        <meta name="description" content="About us page for Company Name" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full flex flex-col items-center">  
        <Image src="/abouts.svg" alt="about" height={90} width={90} />
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          About us
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-6">
          At Fin-AI, we believe that financial education should be engaging, interactive, and accessible to everyone. Our mission is to empower individuals of all ages and backgrounds to take control of their financial future through innovative online learning experiences.
        </p>
      </div>

      <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
        Our Vision
      </h1>
      <p className="text-muted-foreground text-center text-lg mb-6">
        We envision a world where financial literacy is not just a skill, but a way of life. By gamifying the learning process, we aim to make financial education fun, engaging, and effective for learners of all levels.
      </p>

      <div className="text-center font-bold text-neutral-800 text-2xl my-6">
        Fin-AI Team
      </div>

      <div style={{ display: 'flex',  justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {founders.map((founder, index) => (
          <div key={index} style={{ margin: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '230px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ width: '150px', height: '150px', margin: '0 auto', overflow: 'hidden', borderRadius: '50%', marginBottom: '20px' }}>
              <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h2>{founder.name}</h2>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{founder.position}</p>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>{founder.bio}</p>
            {/* Add LinkedIn logo with link */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
                <Image src="/linkedin.svg" alt="LinkedIn" width={30} height={30} />
              </a>
              <a href={founder.instagram} target="_blank" rel="noopener noreferrer" style={{ margin: '0 5px' }}>
                <Image src="/instagram.svg" alt="Instagram" width={30} height={30} />
              </a>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
