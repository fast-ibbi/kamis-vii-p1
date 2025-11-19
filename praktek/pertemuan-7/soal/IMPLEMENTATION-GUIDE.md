# Implementation Guide for React Native Exercises

All 10 soal (exercise) files have been converted to templates. The UI structure and complete StyleSheets are preserved, but the logic has been removed for you to implement.

## Files Status

### ✅ Completed Conversions

1. **soal1.tsx** - Basic Props Component

   - Greeting component with TypeScript interface
   - Simple props demonstration

2. **soal2.tsx** - Custom Button Component

   - CustomButton with style customization
   - Dynamic color props

3. **soal3.tsx** - PropTypes Validation

   - UserCard component with PropTypes
   - Status indicators

4. **soal4.tsx** - Animated Counter

   - Counter with Animated API
   - Multiple button actions
   - History tracking

5. **soal5.tsx** - Registration Form

   - Multi-field form (5 inputs)
   - Live preview feature
   - Password match indicator

6. **soal6.tsx** - Profile Editor

   - Object state management
   - Computed full name display
   - Multi-field profile form

7. **soal7.tsx** - Todo List App

   - AsyncStorage integration
   - Filter and sort functionality
   - CRUD operations
   - Edit mode

8. **soal8.tsx** - Temperature Converter

   - Lifting state up pattern
   - Two-way conversion (Celsius/Fahrenheit)
   - BoilingVerdict component

9. **soal9.tsx** - Login Form with Validation

   - Email/password validation
   - Real-time validation feedback
   - Password requirements checker
   - Loading states

10. **soal10.tsx** - Shopping Cart
    - Product listing
    - Cart management
    - Quantity controls
    - Checkout flow

## What's Preserved

✅ Complete UI structure (Views, ScrollViews, FlatLists)
✅ All TextInput components with proper styling
✅ All TouchableOpacity buttons with layouts
✅ Complete StyleSheet definitions (20-40+ styles per file)
✅ TypeScript interfaces and types
✅ Helper functions (formatCurrency, validation functions, etc.)
✅ Component structure and organization
✅ TODO comments indicating where to add logic

## What Was Removed

❌ useState hooks and state management
❌ useEffect hooks
❌ Event handlers (onPress, onChangeText, etc.)
❌ Data bindings in JSX (value, onChangeText props)
❌ Alert.alert calls
❌ AsyncStorage operations
❌ Conditional rendering logic
❌ Array operations (map, filter, etc.)

## Implementation Tasks

Each file has TODO comments indicating where you need to add:

- State declarations
- Event handlers
- Data bindings
- Business logic
- Conditional rendering

## Expected Errors

The TypeScript compiler will show errors until you implement the logic. Common errors you'll see:

- "Cannot use JSX unless the '--jsx' flag is provided"
- "Variable is assigned but never used"
- Missing value/onChangeText props on TextInputs

These are **expected** and will be resolved as you implement your own logic.

## How to Start

1. Pick a file (start with soal1.tsx for simplest)
2. Read the TODO comments
3. Implement state management with useState
4. Add event handlers
5. Connect UI elements to state
6. Test your implementation

## Tips

- Start with simpler exercises (soal1-3) before complex ones (soal7, soal9, soal10)
- All styling is complete - focus only on logic
- Use TypeScript interfaces as guides for your state shape
- Refer to the complete UI structure to understand what data is needed

Good luck with your implementation! 🚀
