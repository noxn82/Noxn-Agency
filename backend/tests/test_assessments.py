"""Backend tests for NOXN assessments API + smoke tests for legacy endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://promo-launch-hub.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- Smoke / legacy -----
class TestSmoke:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json() == {"message": "NOXN API live"}

    def test_status_post_and_get(self, client):
        r = client.post(f"{API}/status", json={"client_name": "TEST_pytest_client"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["client_name"] == "TEST_pytest_client"
        assert "id" in data and isinstance(data["id"], str)

        r2 = client.get(f"{API}/status")
        assert r2.status_code == 200
        assert any(c["client_name"] == "TEST_pytest_client" for c in r2.json())


# ----- Assessment validation + happy path -----
VALID_PAYLOAD = {
    "campaign_goal": "brand_awareness",
    "services": ["ad_creation", "ad_space"],
    "budget_range": "$5k – $15k",
    "timeline": "Within 1 month",
    "target_locations": "Brooklyn (Williamsburg + DUMBO), Austin downtown",
    "business_name": "TEST_Pytest Co",
    "contact_name": "TEST Pyte",
    "email": "test_pytest@example.com",
    "phone": "+1-555-0000",
    "notes": "Created by pytest regression suite",
}


class TestAssessments:
    created_id = None

    def test_create_valid(self, client):
        r = client.post(f"{API}/assessments", json=VALID_PAYLOAD)
        assert r.status_code == 201, r.text
        data = r.json()
        # UUID id present
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) >= 32
        # All fields persisted
        assert data["campaign_goal"] == VALID_PAYLOAD["campaign_goal"]
        assert data["services"] == VALID_PAYLOAD["services"]
        assert data["budget_range"] == VALID_PAYLOAD["budget_range"]
        assert data["timeline"] == VALID_PAYLOAD["timeline"]
        assert data["target_locations"] == VALID_PAYLOAD["target_locations"]
        assert data["business_name"] == VALID_PAYLOAD["business_name"]
        assert data["contact_name"] == VALID_PAYLOAD["contact_name"]
        assert data["email"] == VALID_PAYLOAD["email"]
        assert "created_at" in data
        # No mongo _id leakage
        assert "_id" not in data
        TestAssessments.created_id = data["id"]

    def test_get_lists_created_desc(self, client):
        r = client.get(f"{API}/assessments")
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list) and len(items) >= 1
        # Created item present
        ids = [it["id"] for it in items]
        assert TestAssessments.created_id in ids
        # Sorted desc by created_at
        timestamps = [it["created_at"] for it in items]
        assert timestamps == sorted(timestamps, reverse=True)
        # No _id leakage
        for it in items:
            assert "_id" not in it

    def test_reject_empty_services(self, client):
        bad = {**VALID_PAYLOAD, "services": []}
        r = client.post(f"{API}/assessments", json=bad)
        assert r.status_code == 422, r.text

    def test_reject_missing_services(self, client):
        bad = {k: v for k, v in VALID_PAYLOAD.items() if k != "services"}
        r = client.post(f"{API}/assessments", json=bad)
        assert r.status_code == 422

    def test_reject_invalid_email(self, client):
        bad = {**VALID_PAYLOAD, "email": "not-an-email"}
        r = client.post(f"{API}/assessments", json=bad)
        assert r.status_code == 422

    def test_reject_missing_business_name(self, client):
        bad = {k: v for k, v in VALID_PAYLOAD.items() if k != "business_name"}
        r = client.post(f"{API}/assessments", json=bad)
        assert r.status_code == 422

    def test_reject_missing_contact_name(self, client):
        bad = {k: v for k, v in VALID_PAYLOAD.items() if k != "contact_name"}
        r = client.post(f"{API}/assessments", json=bad)
        assert r.status_code == 422
