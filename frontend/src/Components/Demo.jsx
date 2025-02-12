import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useUserContext } from "../Contexts/userContext"

const levels = [
    { number: 1, x: -0.175, y: -0.2 },
    { number: 2, x: -0.264, y: -0.11 },
    { number: 3, x: -0.264, y: 0.155 },
    { number: 4, x: -0.269, y: 0.26 },
    { number: 5, x: -0.151, y: 0.24 },
    { number: 6, x: 0.157, y: 0.24 },
    { number: 7, x: 0.059, y: -0.15 },
    { number: 8, x: -0.014, y: -0.018 },
]

const Demo = ({ setDemo }) => {
    const userLevel = 1
    const [currentLevel, setCurrentLevel] = useState(0)
    const [scale, setScale] = useState(1)
    const {user} = useUserContext();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLevel((prev) => (prev + 1) % (levels.length + 1))
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (currentLevel === levels.length) {
            setCurrentLevel(userLevel - 1)
        }
        setScale(currentLevel === levels.length ? 1 : 2.5)
    }, [currentLevel, userLevel])

    const handleSkip = () => {
        axios.put('/api/tutoiralDone',user).catch(err => {
            alert('failed to update the status');
        }).finally(()=>{
            setDemo(false);
        })
    }

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-black/70 via-black/40 to-black/70 p-8">
            <h1 className="text-3xl font-bold text-white mb-4">Reach the center</h1>
            <div className="relative w-[75vw] h-[65vh] overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        x: levels[currentLevel] ? `${-levels[currentLevel].x * 100}%` : 0,
                        y: levels[currentLevel] ? `${-levels[currentLevel].y * 100}%` : 0,
                        scale: scale,
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <img
                        src="/images/sample_map.jpg"
                        alt="Map"
                        className="w-full h-full object-contain border border-solid border-red-600"
                    />
                    {levels.map((level) => (
                        <motion.div
                            key={level.number}
                            className="absolute w-6 h-6 rounded-full bg-red-500 border-2 border-white"
                            style={{
                                left: `${(level.x + 0.5) * 100}%`,
                                top: `${(level.y + 0.5) * 100}%`,
                            }}
                            animate={{
                                scale: currentLevel === level.number - 1 ? 1 : 0.5,
                                opacity: currentLevel === level.number - 1 ? 1.2 : 0.8,
                            }}
                        />
                    ))}
                </motion.div>
            </div>
            <button
                className="px-10 py-2 bg-red-600 rounded-md text-white text-xl mt-4 hover:bg-red-700 active:bg-red-400 transition-colors"
                onClick={handleSkip}
            >
                Skip
            </button>
        </div>
    )
}

export default Demo;

