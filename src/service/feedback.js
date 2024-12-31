import { db } from "@/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

class FeedbackService {
    async addFeedback(feedback) {
        try {
            // Add the feedback document and get the auto-generated ID
            const docRef = await addDoc(collection(db, "feedback"), feedback);

            // Use the auto-generated ID as the course_id
            await updateDoc(doc(db, "feedback", docRef.id), { evaluation_id: docRef.id });
            return docRef.id;
        } catch (err) {
            console.error("Error adding feedback:", err);
            throw err;
        }
    }
}

export default new FeedbackService();