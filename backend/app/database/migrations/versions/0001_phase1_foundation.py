"""Phase 1 foundation — no domain tables yet.

Revision ID: 0001_phase1
Revises:
Create Date: 2026-08-20

"""
from typing import Sequence, Union

revision: str = "0001_phase1"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
