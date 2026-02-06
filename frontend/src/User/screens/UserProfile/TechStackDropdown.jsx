import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { techStacks } from "../../../assets/tech_stacks";

export const TechStackDropdown = ({ onSelectionChange, profileTechStacks }) => {
  const [open, setOpen] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState(profileTechStacks);
  const [allTechStacks, setAllTechStacks] = useState(techStacks);
  const menuRef = useRef(null);


  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Add selected tech stack and remove it from dropdown list
  const addedTechStackHandler = (item) => {
    const isAlreadySelected = selectedTechStack.includes(item);
    if (isAlreadySelected) return;
    setSelectedTechStack((prev) => [...prev, item]);
  };

  // ✅ Remove from selected and add it back to dropdown
  const removeTechStackHandler = (item) => {
    setSelectedTechStack((prev) => prev.filter((tech) => tech !== item));
  };

  useEffect(() => {
    onSelectionChange(selectedTechStack);
  }, [selectedTechStack]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        Choose Tech Stack
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Selected Tech Stack Chips */}
      <div className="flex flex-wrap items-center mt-2">
        {selectedTechStack?.map((item) => (
          <div
            key={item}
            className="flex items-center px-3 py-1 text-sm font-medium text-white rounded-full bg-blue-600 mr-2 mb-2"
          >
            <span>{item}</span>
            <X
              size={16}
              className="ml-2 cursor-pointer hover:text-gray-200"
              onClick={() => removeTechStackHandler(item)}
            />
          </div>
        ))}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="absolute left-0 mt-2 w-full max-h-60 overflow-y-auto 
                     bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]"
        >
          <ul className="py-1 text-sm text-gray-700">
            {allTechStacks.length > 0 ? (
              allTechStacks.map((item, index) => (
                <li
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
                  onClick={() => addedTechStackHandler(item.name)}
                >
                  {item.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400 text-center">
                No tech stacks left
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
