import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const CustomDayComponent = ({ day, eventsCount, isSelected, isToday, onPress }: {
    day: number,
    eventsCount: number,
    isSelected: boolean,
    isToday: boolean,
    onPress: () => void
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.dayButton, isToday && styles.todayDayButton, isSelected && styles.selectedDayButton]}
        >
            <Text style={[styles.dayTitle, eventsCount ? styles.dayTitleWithEvents : styles.dayTitleWoutEvents, isSelected && styles.selectedDayTitle, isToday && styles.todayDayTitle]}>{day}</Text>
            {eventsCount && <Text style={[styles.daySubtitle, isSelected && styles.selectedDaySubtitle, isToday && styles.todayDaySubtitle]}>{eventsCount}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '100%',
        height: '100%'
    },
    dayButton: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayTitle: {
        fontSize: 16,
    },
    dayTitleWithEvents: {
        fontWeight: 'bold',
    },
    dayTitleWoutEvents: {
        opacity: 0.5
    },
    daySubtitle: {
        fontSize: 14,
        color: 'green',
    },
    selectedDayContainer: {
        backgroundColor: '#007bff',
    },
    selectedDayButton: {
        backgroundColor: '#007bff',
    },
    selectedDayTitle: {
        color: 'white',
    },
    selectedDaySubtitle: {
        color: 'white',
    },
    todayDayContainer: {
        backgroundColor: '#ECECEC',
    },
    todayDayButton: {
        backgroundColor: '#ECECEC',
    },
    todayDayTitle: {
        color: 'black',
    },
    todayDaySubtitle: {
        color: 'black',
    },
});
