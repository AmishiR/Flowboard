import React from "react"
import { FaRegFileLines } from "react-icons/fa6"
import { MdOutlineFileDownload } from "react-icons/md"
import { IoCloseSharp } from "react-icons/io5"
import { motion } from "motion/react"

// A small color map to safely handle Tailwind classes
const colorMap = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  red: "bg-red-600",
  yellow: "bg-yellow-600",
}

// ✅ Added 'onDelete' to the props destructuring
function Card({ data, onDelete }) {
  return (
    <motion.div
      drag            // ✅ enables dragging
      dragMomentum={false} // (optional) disables momentum flick
      className="relative w-60 h-72 rounded-[45px] bg-zinc-200 text-black px-5 py-10 cursor-grab overflow-hidden"
    >
      {/* Top Icon */}
      <FaRegFileLines className="text-4xl text-zinc-700" />

      {/* Description */}
      <p className="text-sm text-black mt-5 font-semibold leading-tight">
        {data.description}
      </p>

      {/* Footer */}
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between py-4 px-8 mb-2">
          <h5>{data.filesize}</h5>
          
          {/* ✅ Added onClick and cursor-pointer to the icon span */}
          <span 
            onClick={onDelete}
            className="w-8 h-8 bg-zinc-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-400 transition-colors"
          >
            {data.close ? (
              <IoCloseSharp />
            ) : (
              <MdOutlineFileDownload size="1.4em" />
            )}
          </span>
        </div>

        {/* Tag */}
        {data.tag?.isOpen && (
          <div
            className={`ag w-full py-4 flex items-center justify-center ${
              colorMap[data.tagColor] || "bg-green-600"
            }`}
          >
            <h3 className="text-sm font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Card