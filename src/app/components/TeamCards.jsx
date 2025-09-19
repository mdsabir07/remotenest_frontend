
import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import teamImg1 from '../../assets/sabir vai.jpeg'
import teamImg2 from '../../assets/partho vai.jpg'
import teamImg3 from '../../assets/shimul.jpg'
import teamImg4 from '../../assets/faruk vai.jpeg'


const TeamCards = () => {
    const members = [
        {
            name: 'Sabirul Islam(Leader)',
            skill: 'MERN stack developery',
            description: 'I am a passionate MERN stack developer skilled in building robust and scalable full-stack web applications....',
            imageSrc: teamImg1
        },
        {
            name: 'Ringku Sutradhar Partho',
            skill: 'MERN stack developer',
            description: 'I am a passionate MERN stack developer skilled in building robust and scalable full-stack web applications....',
            imageSrc: teamImg2
        },
        {
            name: 'Shimul Dev Nath',
            skill: 'MERN stack developer',
            description: 'I am a passionate MERN stack developer skilled in building robust and scalable full-stack web applications....',
            imageSrc: teamImg3
        },
        {
            name: 'Omar Faruk',
            skill: 'MERN stack developer',
            description: 'I am a passionate MERN stack developer skilled in building robust and scalable full-stack web applications....',
            imageSrc: teamImg4,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  p-8">
            <div className='mb-10 w-[50%] space-y-2' >
                <h2 className=" text-xl md:text-5xl font-bold text-blue-500 dark:text-blue-500">
                    Meet Our Team
                </h2>
                <p className="text-black text-[10px] md:text-lg dark:text-white ">
                    The team behind RemoteNest
                </p>
                {/* Blue Underline */}
                <div className="w-full h-1 bg-blue-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map((member, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-xl w-full max-w-xs overflow-hidden pb-6 flex flex-col items-center text-center relative">
                        {/* Blue Background Top Section */}
                        <div className="w-full h-28 bg-blue-500 rounded-t-xl relative flex justify-center items-end">
                            {/* Profile Image - positioned over the blue background, but not pushed up */}
                            <div className="absolute -bottom-12 rounded-full overflow-hidden w-28 h-28 border-4 border-white shadow-md">
                                <Image
                                    src={member.imageSrc}
                                    alt={member.name}
                                    width={112} // 28 * 4
                                    height={112} // 28 * 4
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Spacer to push content down below the floating image */}
                        <div className="h-16"></div>

                        {/* Card Content */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                        <p className="text-blue-500 text-sm font-medium mb-4">{member.skill}</p>
                        <p className="text-gray-600 text-sm px-4 mb-6">{member.description}</p>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-2"> {/* Changed 'space-x-4' to 'gap-2' for more control, or adjust if you prefer space-x */}
                            <a href="#" aria-label="GitHub" className="text-gray-500 hover:text-blue-500 transition-colors">
                                <div className="p-1 border-2 border-blue-500 rounded-full flex items-center justify-center">
                                    <FaGithub size={20} />
                                </div>
                            </a>
                            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-blue-500 transition-colors">
                                <div className="p-1 border-2 border-blue-500 rounded-full flex items-center justify-center">
                                    <FaFacebookF size={20} />
                                </div>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-500 transition-colors">
                                <div className="p-1 border-2 border-blue-500 rounded-full flex items-center justify-center">
                                    <FaLinkedinIn size={20} />
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamCards;