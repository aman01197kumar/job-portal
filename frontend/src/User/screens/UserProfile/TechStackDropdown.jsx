import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Plus } from 'lucide-react';
import { techStacks } from '../../../assets/tech_stacks';


export const TechStackDropdown = ({
  selectedTechs,
  onSelectionChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTechs = techStacks.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableTechs = filteredTechs.filter(tech => !selectedTechs.includes(tech.id));

  const handleAddTech = (techId) => {
    if (!selectedTechs.includes(techId)) {
      onSelectionChange([...selectedTechs, techId]);
    }
    setSearchTerm('');
  };

  const handleRemoveTech = (techId) => {
    onSelectionChange(selectedTechs.filter(id => id !== techId));
  };

  const getSelectedTechsData = () => {
    return techStacks.filter(tech => selectedTechs.includes(tech.id));
  };

  const groupedTechs = availableTechs.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {});

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Tech Stacks */}
      {selectedTechs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {getSelectedTechsData().map(tech => (
            <span
              key={tech.id}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${tech.color} transition-all duration-200 hover:shadow-lg`}
            >
              {tech.name}
              <button
                onClick={() => handleRemoveTech(tech.id)}
                className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        <span className="text-gray-700 flex items-center">
          <Plus size={16} className="mr-2" />
          Add Tech Stack
        </span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search tech stacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {Object.entries(groupedTechs).map(([category, techs]) => (
              <div key={category} className="p-2">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 px-2">{category}</h4>
                <div className="space-y-1">
                  {techs.map(tech => (
                    <button
                      key={tech.id}
                      onClick={() => handleAddTech(tech.id)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center"
                    >
                      <span className={`w-3 h-3 rounded-full ${tech.color} mr-3`}></span>
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};