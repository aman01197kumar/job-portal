import { Header } from './Header'
import aman from '../../assets/imgs/advisers/aman.JPG'
import pratyush from '../../assets/imgs/advisers/pratyush.jpeg'
import vikas from '../../assets/imgs/advisers/vikas.jpeg'
import CareerAdviserCard from '../CareerAdviserCard'

const advisers = [
    {
        adviser_name: "Pratyush Mishra",
        adviser_description: "I am a mern developer and trainer",
        adviser_skills: ['React', 'Express.js', 'Node.js', 'MongoDB'],
        adviser_pic: pratyush,
        profile: 'Java Development'
    },
    {
        adviser_name: "Vikas",
        adviser_description: "I am a mern developer and trainer",
        adviser_skills: ['React', 'Express.js', 'Node.js', 'MongoDB'],
        adviser_pic: vikas,
        profile: 'MERN Developer'
    },
    {
        adviser_name: "Aman Kumar",
        adviser_description: "I am a mern developer and trainer",
        adviser_skills: ['React', 'Express.js', 'Node.js', 'MongoDB'],
        adviser_pic: aman,
        profile: 'Full Stack Developer'
    },
]
const CareerAdvice = () => {
    return (
        <>
            <Header />
            <div className="grid grid-cols-3 gap-4">
                {advisers?.map(
                    ({ adviser_name, adviser_description, adviser_skills, adviser_pic, profile }, index) => (
                        <CareerAdviserCard
                            key={index} // always add a key when mapping
                            adviser_name={adviser_name}
                            adviser_description={adviser_description}
                            adviser_skills={adviser_skills}
                            adviser_pic={adviser_pic}
                                profile={profile}
                        />
                    )
                )}
            </div>

        </>
    )
}

export default CareerAdvice