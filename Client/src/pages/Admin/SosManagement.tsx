import React, { useState } from 'react';
import {
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { formatDate } from '@/utils/dateFormater';

const SOSManagement = () => {
  const [sosData, setSosData] = useState([
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      initiaterDetails: {
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        mobile: '+1 (555) 123-4567',
      },
      location: { lat: 40.7128, lng: -74.006 },
      triggeredAt: '2024-03-15T14:30:00Z',
      status: 'OPEN',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      initiaterDetails: {
        fullName: 'Michael Chen',
        email: 'michael.chen@email.com',
        mobile: '+1 (555) 234-5678',
      },
      location: { lat: 34.0522, lng: -118.2437 },
      triggeredAt: '2024-03-15T13:15:00Z',
      status: 'RESOLVED',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      initiaterDetails: {
        fullName: 'Emily Davis',
        email: 'emily.davis@email.com',
        mobile: '+1 (555) 345-6789',
      },
      location: { lat: 51.5074, lng: -0.1278 },
      triggeredAt: '2024-03-15T12:45:00Z',
      status: 'OPEN',
    },
  ]);

  const [filter, setFilter] = useState('ALL');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleStatusChange = id => {
    setSosData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'RESOLVED' } : item
      )
    );
  };

  const openMap = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const filteredData = sosData.filter(item => {
    if (filter === 'ALL') return true;
    return item.status === filter;
  });

  const openCount = sosData.filter(item => item.status === 'OPEN').length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600 shadow-lg shadow-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  SOS Management
                </h1>
                <p className="text-slate-500 text-sm">
                  {openCount} active alert{openCount !== 1 ? 's' : ''} •{' '}
                  {sosData.length} total
                </p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center bg-white rounded-lg p-1 shadow-sm border border-slate-200">
              {['ALL', 'OPEN', 'RESOLVED'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    filter === status
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="space-y-4">
          {filteredData.map(log => (
            <div
              key={log.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* 1. User Info (Same as original) */}
                  <div className="lg:col-span-3 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                      {getInitials(log.initiaterDetails.fullName)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {log.initiaterDetails.fullName}
                      </p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        #{log.id.slice(-8)}
                      </p>
                    </div>
                  </div>

                  {/* 2. Contact Info (Stacked fully visible) */}
                  <div className="lg:col-span-3 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">
                        {log.initiaterDetails.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">
                        {log.initiaterDetails.mobile}
                      </span>
                    </div>
                  </div>

                  {/* 3. Time (Distinct Section) */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 pl-0 lg:pl-4 border-l-0 lg:border-l border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                          Triggered
                        </p>
                        <p className="text-xs font-semibold text-slate-900">
                          {formatDate(log.triggeredAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Actions (Compact Buttons) */}
                  <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 justify-end items-stretch sm:items-center">
                    {/* Map Button */}
                    <button
                      onClick={() =>
                        openMap(log.location.lat, log.location.lng)
                      }
                      className="group flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all whitespace-nowrap"
                    >
                      <MapPin className="w-4 h-4 text-slate-500 group-hover:text-red-500 transition-colors" />
                      <span>Map</span>
                    </button>

                    {/* Status Button */}
                    {log.status === 'OPEN' ? (
                      <button
                        onClick={() => handleStatusChange(log.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all whitespace-nowrap shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Resolve</span>
                      </button>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-sm font-medium whitespace-nowrap">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Done</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center mt-6">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-slate-900 font-medium">No alerts found</p>
            <p className="text-slate-500 text-sm mt-1">
              There are no {filter.toLowerCase()} alerts at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSManagement;
