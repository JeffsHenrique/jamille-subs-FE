import type { SyncMock } from '../types/Mock'

class SyncSegmentsApi {
    getSegments(): Promise<SyncMock[]> {
        const segments: SyncMock[] = [
            {
                id: 1,
                start: 0.0,
                end: 1.0,
                text: "Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone."
            },
            {
                id: 2,
                start: 8.0,
                end: 3.0,
                text: "Espera a\u00ed."
            },
            {
                id: 3,
                start: 3.0,
                end: 12.0,
                text: "Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone. Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone. Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone. Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone."
            },
            {
                id: 4,
                start: 6.0,
                end: 9.0,
                text: "Vale."
            },
            {
                id: 5,
                start: 10.0,
                end: 15.0,
                text: "Te dou uma cara a n\u00e3o."
            },
            {
                id: 6,
                start: 15.0,
                end: 18.5,
                text: "Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone."
            },
            {
                id: 7,
                start: 19.0,
                end: 21.0,
                text: "Espera a\u00ed."
            },
            {
                id: 8,
                start: 21.5,
                end: 25.0,
                text: "Al\u00f4?"
            },
            {
                id: 9,
                start: 26.0,
                end: 29.0,
                text: "Vale."
            },
            {
                id: 10,
                start: 30.0,
                end: 35.0,
                text: "Te dou uma cara a n\u00e3o."
            },
            {
                id: 11,
                start: 35.0,
                end: 41.0,
                text: "Tem uma m\u00f4nica querendo falar com voc\u00ea no telefone."
            },
            {
                id: 12,
                start: 41.0,
                end: 43.0,
                text: "Espera a\u00ed."
            },
            {
                id: 13,
                start: 43.0,
                end: 45.0,
                text: "Al\u00f4?"
            },
            {
                id: 14,
                start: 46.0,
                end: 49.0,
                text: "Vale."
            },
            {
                id: 15,
                start: 50.0,
                end: 55.0,
                text: "Te dou uma cara a n\u00e3o."
            },
        ]
        return Promise.resolve(segments)
    }
}

export const syncSegmentsApi = new SyncSegmentsApi()