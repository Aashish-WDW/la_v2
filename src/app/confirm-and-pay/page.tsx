'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Calendar,
  Users,
  Home,
  CreditCard,
  Smartphone,
  Banknote,
  Eye,
  Edit,
  X,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import CalendarRangeModal from '../../components/property_c/CalendarRangeModal';
import { getPropertyById } from '@/data/dummyData';

const BookingConfirmationPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const property = propertyId ? getPropertyById(propertyId) : null;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [showDatesModal, setShowDatesModal] = useState(false);
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [tempDates, setTempDates] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [tempGuests, setTempGuests] = useState({
    adults: 0,
    children: 0,
  });
  const [tempCheckInTime, setTempCheckInTime] = useState('12:00pm – 2:00pm');

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the session
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    // Check if user is host
    const checkHostStatus = async () => {
      try {
        // In a real app, this would be an API call to check host status
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setIsHost(user.isHost || false);
        }
      } catch (error) {
        console.error('Error checking host status:', error);
      }
    };
    checkHostStatus();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = (field: string) => {
    setUser(prev => ({
      ...prev,
      [field]: tempValue
    }));
    setEditingField(null);
    // In a real app, this would update the user data in the backend
    localStorage.setItem('user', JSON.stringify({
      ...user,
      [field]: tempValue
    }));
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const booking = {
    checkIn: '2025-06-01',
    checkOut: '2025-06-05',
    guests: {
      adults: 2,
      children: 1,
    },
    totalPrice: 672,
  };

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiOption, setUpiOption] = useState('qr');

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const onLookAroundClick = () => alert('Look Around clicked');

  const onPaymentSubmit = () => {
    alert(`Payment initiated using ${paymentMethod}`);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SUMMER50') {
      setDiscount(50);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

  const handleDatesSave = () => {
    // Update booking dates
    booking.checkIn = tempDates.checkIn;
    booking.checkOut = tempDates.checkOut;
    setShowDatesModal(false);
    toast.success('Dates updated successfully');
  };

  const handleGuestsSave = () => {
    // Update booking guests
    booking.guests = tempGuests;
    setShowGuestsModal(false);
    toast.success('Guest count updated successfully');
  };

  const handleCheckInTimeSave = () => {
    // Update check-in time
    setShowCheckInModal(false);
    toast.success('Check-in time updated successfully');
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto" />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
                <div className="h-5 bg-gray-300 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
                <div className="h-5 bg-gray-300 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-10 bg-gray-300 rounded w-full mt-4" />
              </div>
            </div>
            <div className="lg:w-1/3 space-y-6">
              <div className="h-40 bg-gray-300 rounded-lg" />
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-10 bg-blue-300 rounded w-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return (
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-24 bg-gradient-to-b from-gray-50 to-white">
  //       <div className="text-center mb-10">
  //         <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Please Log In</h1>
  //         <p className="text-gray-600 text-lg mb-8">You need to be logged in to complete your booking</p>
  //         <button
  //           onClick={handleLogin}
  //           className="px-8 py-3 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600 transition-colors"
  //         >
  //           Log In / Sign Up
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Confirm and Pay</h1>
        <p className="text-gray-600 text-lg">Complete your booking below</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Panel */}
        <div className="lg:w-2/3 space-y-10 pr-0 lg:pr-4">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <div className="font-semibold text-gray-900">Name</div>
                  {editingField === 'name' ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                      />
                      <button
                        onClick={() => handleSave('name')}
                        className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div>{user.name}</div>
                      <button
                        onClick={() => handleEdit('name', user.name)}
                        className="text-[#00aeef] hover:underline"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <div className="font-semibold text-gray-900">Phone Number</div>
                  {editingField === 'phone' ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="tel"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                      />
                      <button
                        onClick={() => handleSave('phone')}
                        className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div>{user.phone}</div>
                      <button
                        onClick={() => handleEdit('phone', user.phone)}
                        className="text-[#00aeef] hover:underline"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  {editingField === 'email' ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="email"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                      />
                      <button
                        onClick={() => handleSave('email')}
                        className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div>{user.email}</div>
                      <button
                        onClick={() => handleEdit('email', user.email)}
                        className="text-[#00aeef] hover:underline"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-8 text-gray-900">Your Trip Details</h2>
            <div className="flex flex-col gap-6 text-base text-gray-700">
              {/* Dates */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <div className="font-semibold text-gray-900">Dates</div>
                  <div>{formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}</div>
                </div>
                <button 
                  onClick={() => setShowDatesModal(true)}
                  className="text-[#00aeef] font-medium hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Check-in Time */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <div className="font-semibold text-gray-900">Check-in time</div>
                  <div>{tempCheckInTime}</div>
                </div>
                {isHost && (
                  <button 
                    onClick={() => setShowCheckInModal(true)}
                    className="text-[#00aeef] font-medium hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Guests */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">Guests</div>
                  <div>{booking.guests.adults + booking.guests.children} guest{(booking.guests.adults + booking.guests.children) > 1 ? 's' : ''}</div>
                </div>
                <button 
                  onClick={() => setShowGuestsModal(true)}
                  className="text-[#00aeef] font-medium hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="font-semibold text-xl mb-6 text-gray-900">Payment Summary</h3>
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 border px-4 py-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
                />
                <button
                  onClick={applyCoupon}
                  className="cursor-pointer bg-[#00aeef] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#0095cc] text-base transition"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-sm mb-2">{couponError}</p>}
              <div className="space-y-2 text-base">
                <div className="flex justify-between">
                  <span>{formatCurrency(property.price)} × {nights} nights</span>
                  <span>{formatCurrency(property.price * nights)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lookaround service fee</span>
                  <span>{formatCurrency(booking.totalPrice - property.price * nights)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                  <span>Total (USD)</span>
                  <span>{formatCurrency(booking.totalPrice - discount)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-10">
              <h3 className="font-semibold text-xl mb-6 text-gray-900">Choose Payment Method</h3>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="UPI">UPI</option>
                <option value="Card">Debit / Credit Card</option>
                <option value="NetBanking">Net Banking</option>
              </select>
              <div className="mt-6 space-y-4">
                {paymentMethod === 'UPI' && (
                  <div className="space-y-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="upiOption"
                        value="qr"
                        checked={upiOption === 'qr'}
                        onChange={() => setUpiOption('qr')}
                      />
                      Scan the QR Code
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="upiOption"
                        value="id"
                        checked={upiOption === 'id'}
                        onChange={() => setUpiOption('id')}
                      />
                      Pay with UPI ID
                    </label>
                    {upiOption === 'id' && (
                      <input
                        type="text"
                        placeholder="Enter UPI ID"
                        className="w-full border px-4 py-2 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#00aeef]"
                      />
                    )}
                  </div>
                )}
                {paymentMethod === 'Card' && (
                  <div className="space-y-4">
                    <input type="text" placeholder="Card Number" className="w-full border px-4 py-2 rounded-lg text-base" />
                    <input type="text" placeholder="Name on Card" className="w-full border px-4 py-2 rounded-lg text-base" />
                    <div className="flex gap-2">
                      <input type="text" placeholder="MM/YY" className="w-1/2 border px-4 py-2 rounded-lg text-base" />
                      <input type="text" placeholder="CVV" className="w-1/2 border px-4 py-2 rounded-lg text-base" />
                    </div>
                  </div>
                )}
                {paymentMethod === 'NetBanking' && (
                  <div className="space-y-4">
                    <input type="text" placeholder="Bank Name" className="w-full border px-4 py-2 rounded-lg text-base" />
                    <input type="text" placeholder="Account Holder Name" className="w-full border px-4 py-2 rounded-lg text-base" />
                  </div>
                )}
              </div>
              <button
                onClick={onPaymentSubmit}
                className="cursor-pointer mt-8 w-full bg-gradient-to-r from-[#00aeef] to-blue-600 text-white font-bold py-3 px-4 rounded-xl text-lg shadow-lg hover:opacity-90 transition-all duration-200 sticky bottom-0 z-20"
              >
                Pay {formatCurrency(booking.totalPrice - discount)}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:w-1/3 space-y-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <img
              src='/home.jpg'
              alt={property.title}
              className="rounded-t-2xl w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 bg-[#00aeef]/10 text-[#00aeef] px-3 py-1 rounded-full text-xs font-semibold">
                  <Eye size={14} /> Lookaround Verified
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{property.location.city}, {property.location.country}</span>
              </div>
              <h3 className="font-bold text-lg mb-1 text-gray-900">{property.title}</h3>
              {/* <p className="text-gray-600 mb-2 text-sm">Entire home hosted by <span className="font-medium text-gray-900">{property.host.name}</span></p> */}
            </div>
          </div>

          {/* {property.hasLookAround && (
            <div className="p-6 border border-blue-200 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 shadow">
              <div className="flex items-center mb-3">
                <Eye size={20} className="text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-[#00aeef]">Take a virtual tour of your booked property</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Get familiar with the property before your stay! Take a virtual walk through all rooms
                and spaces to plan your trip better.
              </p>
              <button
                onClick={onLookAroundClick}
                className="cursor-pointer bg-gradient-to-r from-[#00aeef] to-blue-600 text-white font-medium rounded-lg px-5 py-2 hover:opacity-90 transition-opacity duration-200"
              >
                Look Around the Property
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* Dates Modal */}
      {showDatesModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Dates</h3>
              <button onClick={() => setShowDatesModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input
                  type="date"
                  value={tempDates.checkIn}
                  onChange={(e) => setTempDates(prev => ({ ...prev, checkIn: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input
                  type="date"
                  value={tempDates.checkOut}
                  onChange={(e) => setTempDates(prev => ({ ...prev, checkOut: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowDatesModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDatesSave}
                className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guests Modal */}
      {showGuestsModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Guests</h3>
              <button onClick={() => setShowGuestsModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTempGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                    className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{tempGuests.adults}</span>
                  <button
                    onClick={() => setTempGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTempGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                    className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{tempGuests.children}</span>
                  <button
                    onClick={() => setTempGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                    className="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowGuestsModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleGuestsSave}
                className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Check-in Time Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Check-in Time</h3>
              <button onClick={() => setShowCheckInModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Time Range</label>
                <select
                  value={tempCheckInTime}
                  onChange={(e) => setTempCheckInTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00aeef]"
                >
                  <option value="12:00pm – 2:00pm">12:00pm – 2:00pm</option>
                  <option value="2:00pm – 4:00pm">2:00pm – 4:00pm</option>
                  <option value="4:00pm – 6:00pm">4:00pm – 6:00pm</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowCheckInModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckInTimeSave}
                className="px-4 py-2 bg-[#00aeef] text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmationPage;
