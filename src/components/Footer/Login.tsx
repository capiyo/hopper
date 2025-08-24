import React from 'react'

export const Login = () => {
  return (
  <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">User</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Senior React Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input 
                    type="text" 
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Remote, New York"
                  />
                </div>
                <button className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Continue
                </button>
              </div>
  )
}
