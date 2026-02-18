// /**
//  * Finds and returns the maximum value in an array of numbers
//  * @param nums - Array of numbers to search through
//  * @returns The largest number in the array, or -Infinity if the array is empty
//  */
// function getMax(nums: number[]): number {
//     // Handle edge case: return -Infinity for empty arrays (better than magic number)
//     if (nums.length === 0) {
//         return -Infinity;
//     }

//     // Initialize maxValue with the first element instead of arbitrary magic number
//     // Using non-null assertion (!) since we checked length > 0 above
//     let maxValue: number = nums[0]!;

//     // Loop through the array starting from index 1
//     for (let i = 1; i < nums.length; i++) {
//         // Compare each element and update maxValue if a larger number is found
//         // Using non-null assertion (!) to assure TypeScript the element exists
//         if (nums[i]! > maxValue) {
//             maxValue = nums[i]!;
//         }
//     }

//     // Return the maximum value found
//     return maxValue;
// }

// // Alternative: Using built-in Math.max() with spread operator (most efficient)
// function getMaxModern(nums: number[]): number {
//     // Returns -Infinity for empty arrays automatically
//     return Math.max(...nums);
// }

// // Alternative: Using Array.reduce() (functional approach)
// function getMaxReduce(nums: number[]): number {
//     return nums.reduce((max, current) => current > max ? current : max, -Infinity);
// }


//  A Function

interface User {
    firstName: string;
    lastName: string;
    age: number;
}

function filterUser(users: User[]): User[] {
    const ans: User[] = [];

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user && user.age > 18) {
            ans.push(user);
        }
    }

    return ans;
}