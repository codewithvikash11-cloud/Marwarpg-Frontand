'use client';

import { useEffect, useState } from 'react';
import { Plus, Users } from 'lucide-react';
import api from '@/config/api';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/rooms')
      .then(({ data }) => {
        if (data.success) setRooms(data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Rooms & Allocation</h1>
          <p className="text-gray-500 text-sm mt-1">Manage PG rooms, capacity, and assignments</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>Add Room</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading rooms...</div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl border border-gray-100">No rooms found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room: any) => (
            <div key={room._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Room {room.roomNumber}</h3>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-md ${room.type === 'AC' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {room.type}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-500">₹{room.rent}</p>
                  <p className="text-xs text-gray-500">per month</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="flex items-center"><Users size={16} className="mr-2" /> Occupancy</span>
                  <span className="font-medium text-gray-900">{room.occupiedBeds} / {room.capacity}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(room.occupiedBeds / room.capacity) * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
