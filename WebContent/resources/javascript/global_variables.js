// path to the server calls via AJAX
var serverPath = "/Degree_Project/";



// keep programmes current details: prices, discounts, etc.
var programmesDetails = "";

//total number of members in the database
var totalMembers = "";   

//all members in json object
var allMembers = "";        // ???????????????????????????????


// 'reports_big_table.js' file will access this data (when loading 'jquery.ready')
var reportsBigTableType = "";  // 0 = 'Show all joined' (assigned from this file)
                               // 1 = 'Show all booked memberships' (assigned from this file)
                               // 2 = 'Show members with the valid memberships'
                               // 3 = 'Today's visits' (assigned from 'bottom_panel.js')
                               // 4, 5, 6 = get members by specified programme type ('1 Month Mbsh', '3 Months Mbsh', 'Pay as You Go', etc..),
                               // 7 = get visited members by the specified period of weeks (1 Week, 2 Weeks, 4 Weeks, etc..)
                               // 8 = show missing members, who haven't attended in specified period of time

// 'reports_big_table.js; file will access this data (when loading 'jquery.ready')
var programmeType = "";  // report types ('1 Month Membership', '3 Months Membership', etc)

// number of weeks to fetch members from database by this number by date backwards
var numberOfWeeks = "";

// programmes types to iterate through get details of
var programmes = ["'1 Month Mbsh'", "'3 Months Mbsh'", "'6 Months Mbsh'", "'12 Months Mbsh'", "'Pay as You Go'", "'Other'"];
// programmes booked by members
// values will be stored from 'loading_content.js' file 'programmesBooked' function
var booked = [];